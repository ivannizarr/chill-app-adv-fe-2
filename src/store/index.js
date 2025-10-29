import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export {
  fetchMovies,
  selectMoviesByCategory,
  selectGroupedMovies
} from './movieSlice';