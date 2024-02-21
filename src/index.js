import { fetchPopularMovies } from './partials/main-page';
import { showLoader, hideLoader } from './partials/t5-loader-functionality';

const page = 1;
const itemsPerPage = 18;

fetchPopularMovies(page, itemsPerPage);

showLoader();

setTimeout(() => {
  hideLoader();
}, 2000);
