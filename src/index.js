
import * as renderingMovieCards from './js/rendering-movie-cards';
import * as searchByKeyword from './js/search-by-keyword';

import * as openModal from './js/open-and-close-modal';
import * as teamModal from './js/team-load-to-modal';
import * as galleryMarkup from './js/create-gallery-markup';

import * as modalFilm from './js/loading-into-modal';
import * as openAndCloseModal from './js/open-and-close-modal';
import './js/loader';

import { refs } from './js/refs';
import { onBtnPageClick } from './js/pagination';
import { onBtnAddToLibrary } from './js/add-to-watched&queue';

refs.pagination.addEventListener('click', onBtnPageClick);
refs.btnWrapper.addEventListener('click', onBtnAddToLibrary);
