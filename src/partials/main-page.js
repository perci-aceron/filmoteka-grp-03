import { genresNamesById } from "./genre";
import { showLoader, hideLoader } from './t5-loader-functionality';

const api_key = '9ce408291b177c2a2e598968d33c0b4a';
const base_url = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const movieContainer = document.getElementById('movie-container');
const paginationContainer = document.getElementById('pagination-container');

let currentPage = 1;
let itemsPerPage = 18;

function createPaginationButtons(totalPages, itemsPerPage) {
  paginationContainer.innerHTML = '';

  const maxVisiblePages = 9;
  const ellipsisThreshold = 3;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    const button = document.createElement('button');
    button.textContent = '1';
    button.addEventListener('click', () => {
      currentPage = 1;
      fetchPopularMovies(currentPage, itemsPerPage);
    });
    paginationContainer.appendChild(button);

    if (startPage > 2) {
      const ellipsisStart = document.createElement('span');
      ellipsisStart.textContent = '...';
      paginationContainer.appendChild(ellipsisStart);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      fetchPopularMovies(currentPage, itemsPerPage);
    });

    paginationContainer.appendChild(button);
  }

  if (endPage < totalPages) {
    const ellipsisEnd = document.createElement('span');
    ellipsisEnd.textContent = '...';
    paginationContainer.appendChild(ellipsisEnd);
  }
}

export async function fetchPopularMovies(page, itemsPerPage) {
  showLoader();
  try {
    const response = await fetch(
      `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    hideLoader();
    const totalMovies = data.total_results;
    showMovies(data.results.slice(0, itemsPerPage));
    createPaginationButtons(data.total_pages, itemsPerPage);
    console.log(data);
    console.log(totalMovies);
  } catch (err) {
    hideLoader();
    console.error(err);
  }
}

fetchPopularMovies(currentPage, itemsPerPage);

function showMovies(data) {
  movieContainer.innerHTML = ' ';

  data.forEach(movie => {
    const { title, poster_path, genre_ids, release_date } = movie;
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `<img src ="${IMAGE_URL}${poster_path} alt="${title}"/>
            <div class="movie-card-text">
            <h2 class="movie-title">${title}</h2>
            <p class="movie-card-genre">${getGenre(genre_ids)} 
            <span class="movie-release">| ${getMovieReleaseDate(
              release_date
            )}</span>
            </p>
            </div>`;
    movieContainer.appendChild(movieCard);
  });
}

function getGenre(movieGenre) {
  const genreNames = movieGenre.map(id => {
    const genre = genresNamesById.find(g => g.id === id);
    return genre.name;
  });

  return genreNames.join(',');
}

function getMovieReleaseDate(year) {
  const dateString = year;
  const movieDate = new Date(dateString);
  return movieDate.getFullYear();
}
