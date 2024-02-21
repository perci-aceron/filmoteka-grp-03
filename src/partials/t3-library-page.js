

export function showWatchedMovies() {
    let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    let watchedMoviesContainer = document.getElementById('watched-container');

    watchedMoviesContainer.innerHTML = ''; 

    watchedMovies.forEach(movieId => {
        let movieDetails = getMovieDetails(movieId);
        // let libraryMovieCard = document.createElement('div');
        // libraryMovieCard.classList.add('library-movie-card'); 
        watchedMoviesContainer.innerHTML += `<img src ="${IMAGE_URL}${poster_path} alt="${title}"/>
            <div class="movie-card-text">
            <h2 class="movie-title">${title}</h2>
            <p class="movie-card-genre">${getGenre(genre_ids)} 
            <span class="movie-release">| ${getMovieReleaseDate(release_date)}</span>
            </p>
            </div>`
    });
}

export function showQueueMovies() {
    let queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
    let queueMoviesContainer = document.getElementById('queue-container');

    queueMoviesContainer.innerHTML = '';

    queueMovies.forEach(movieId => {
        let movieDetails = getMovieDetails(movieId);

        queueMoviesContainer.innerHTML += `<img src ="${IMAGE_URL}${poster_path} alt="${title}"/>
            <div class="movie-card-text">
            <h2 class="movie-title">${title}</h2>
            <p class="movie-card-genre">${getGenre(genre_ids)} 
            <span class="movie-release">| ${getMovieReleaseDate(release_date)}</span>
            </p>
            </div>`
    })
}