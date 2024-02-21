// import { genresNamesById } from "./genre";
// import { showLoader, hideLoader } from './t5-loader-functionality';

// const api_key = '9ce408291b177c2a2e598968d33c0b4a';
// const base_url = 'https://api.themoviedb.org/3/';
// const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
// const movieContainer = document.getElementById('movie-container');

// let currentPage = 1;
// let itemsPerPage = 18;

// export function fetchPopularMovies(page, itemsPerPage) {
//   showLoader();
//   return fetch(
//     `${base_url}discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${page}`
//   )
//     .then(response => response.json())
//     .then(data => {
//       hideLoader();
//       const totalMovies = data.total_results;
//       console.log(data);
//       console.log(totalMovies);
//       const movieList = data.results;
//       const slicedMoviePerPage = movieList.slice(0, itemsPerPage);
//       console.log(movieList.slice(0, itemsPerPage));
//       showMovies(slicedMoviePerPage);
//     })

//     .catch(err => {
//       hideLoader();
//       console.error(err);
//     });
// }

// fetchPopularMovies(currentPage, itemsPerPage);

// function showMovies(data) {
//   movieContainer.innerHTML = ' ';

//   data.forEach(movie => {
//     const { title, poster_path, genre_ids, release_date } = movie;

//     const truncatedTitle =
//       title.length > 15 ? title.substring(0, 25) + '...' : title;

//     const movieCard = document.createElement('div');
//     movieCard.classList.add('movie-card');
//     movieCard.innerHTML = `<img src ="${IMAGE_URL}${poster_path}" alt="${title}"/>
//             <div class="movie-card-text">
//             <h2 class="movie-title">${truncatedTitle}</h2>
//             <p class="movie-card-genre">${getGenre(genre_ids)}
//             <span class="movie-release">| ${getMovieReleaseDate(
//               release_date
//             )}</span>
//             </p>
//             </div>`;
//     movieContainer.appendChild(movieCard);
//   });
// }

// function getGenre(movieGenre) {
//   const genreNames = movieGenre.map(id => {
//     const genre = genresNamesById.find(g => g.id === id);
//     return genre.name;
//   });

//   return genreNames.join(',');
// }

// function getMovieReleaseDate(year) {
//   const dateString = year;
//   const movieDate = new Date(dateString);
//   return movieDate.getFullYear();
// }

import { genresNamesById } from './genre';
import { showLoader, hideLoader } from './t5-loader-functionality';

const API_KEY = '9ce408291b177c2a2e598968d33c0b4a';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const movieContainer = document.getElementById('movie-container');

let currentPage = 1;
let itemsPerPage = 18;

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
    console.log(data);
    console.log(totalMovies);
  } catch (err) {
    hideLoader();
    console.error(err);
  }
}

fetchPopularMovies(currentPage, itemsPerPage);

function showMovies(data) {
  movieContainer.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, genre_ids, release_date } = movie;

    const truncatedTitle =
      title.length > 15 ? title.substring(0, 25) + '...' : title;

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `<img src ="${IMAGE_URL}${poster_path}" alt="${title}"/>
            <div class="movie-card-text">
            <h2 class="movie-title">${truncatedTitle}</h2>
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
  const genreNames = genresNamesById
    .filter(g => movieGenre.includes(g.id))
    .map(g => g.name);

  return genreNames.join(',');
}

function getMovieReleaseDate(year) {
  const dateString = year;
  const movieDate = new Date(dateString);
  return movieDate.getFullYear();
}
