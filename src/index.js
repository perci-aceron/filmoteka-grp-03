import { fetchPopularMovies } from './partials/main-page';
import { showLoader, hideLoader } from './partials/t5-loader-functionality';
// import { showWatchedMovies, showQueueMovies } from './partials/t3-library-page';

const page = 1;
const itemsPerPage = 18;

fetchPopularMovies(page, itemsPerPage);

showLoader();

setTimeout(() => {
  hideLoader();
}, 3000);

// showWatchedMovies();
// showQueueMovies();
