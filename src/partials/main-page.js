import { genresNamesById } from './genre';
import { showLoader, hideLoader } from './t5-loader-functionality';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9ce408291b177c2a2e598968d33c0b4a';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const movieContainer = document.getElementById('movie-container');
const paginationContainer = document.getElementById('pagination-container');

let currentPage = 1;
let itemsPerPage = 18;

function createPaginationButtons(totalPages, itemsPerPage) {
  paginationContainer.innerHTML = '';

  const maxVisiblePages = 10; // Adjust the maximum number of visible pages
  const ellipsisThreshold = 3; // Minimum number of pages needed for ellipses

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
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

  // Add ellipses before and after the page numbers
  if (startPage > 1) {
    const ellipsisStart = document.createElement('span');
    ellipsisStart.textContent = '...';
    paginationContainer.insertBefore(
      ellipsisStart,
      paginationContainer.firstChild
    );
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
  return movieGenre
    .map(id => genresNamesById.find(g => g.id === id).name)
    .join(',');
}

function getMovieReleaseDate(year) {
  const movieDate = new Date(year);
  return movieDate.getFullYear();
}
