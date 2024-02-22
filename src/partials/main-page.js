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

  const maxVisiblePages = 5;
  const ellipsisThreshold = 3;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    const buttonStart = document.createElement('button');
    buttonStart.textContent = '1';
    buttonStart.addEventListener('click', () => {
      handlePaginationButtonClick(1);
    });
    paginationContainer.appendChild(buttonStart);

    if (startPage > ellipsisThreshold) {
      const ellipsisStart = document.createElement('span');
      ellipsisStart.textContent = '...';
      paginationContainer.appendChild(ellipsisStart);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      handlePaginationButtonClick(i);
    });

    paginationContainer.appendChild(button);
  }

  if (endPage < totalPages) {
    if (totalPages - endPage > ellipsisThreshold) {
      const ellipsisEnd = document.createElement('span');
      ellipsisEnd.textContent = '...';
      paginationContainer.appendChild(ellipsisEnd);

      const lastPageButton = document.createElement('button');
      const lastPageNumber = Math.min(totalPages, endPage + ellipsisThreshold);
      lastPageButton.textContent = lastPageNumber;
      lastPageButton.addEventListener('click', () => {
        handlePaginationButtonClick(lastPageNumber);
      });
      paginationContainer.appendChild(lastPageButton);
    } else {
      const buttonEnd = document.createElement('button');
      buttonEnd.textContent = totalPages;
      buttonEnd.addEventListener('click', () => {
        handlePaginationButtonClick(totalPages);
      });
      paginationContainer.appendChild(buttonEnd);
    }
  }

  updatePaginationButtons();
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

function updatePaginationButtons() {
  const buttons = paginationContainer.querySelectorAll('button');
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('clicked');
    } else {
      button.classList.remove('clicked');
    }
  });
}

function handlePaginationButtonClick(pageNumber) {
  currentPage = pageNumber;
  fetchPopularMovies(currentPage, itemsPerPage);
  updatePaginationButtons();
}

fetchPopularMovies(currentPage, itemsPerPage);

