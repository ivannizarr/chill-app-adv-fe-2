import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovies,
  selectMoviesByCategory,
  selectGroupedMovies
} from '../store';

export const useMovies = () => {
  const dispatch = useDispatch();

  const movies = useSelector(state => state.movies.movies);
  const loading = useSelector(state => state.movies.loading);
  const error = useSelector(state => state.movies.error);
  const isInitialized = useSelector(state => state.movies.isInitialized);
  const groupedMovies = useSelector(selectGroupedMovies);

  useEffect(() => {
    if (!isInitialized && !loading) {
      dispatch(fetchMovies());
    }
  }, [dispatch, isInitialized, loading]);

  return {
    // Data
    movies,
    loading,
    error,
    groupedMovies,

    // Functions
    fetchMovies: () => dispatch(fetchMovies()),

    // Helper functions
    getGroupedMovies: () => groupedMovies,
    getMoviesByCategory: (category) => movies.filter(m => m.category === category)
  };
};

export const useMoviesByCategory = (category) => {
  const dispatch = useDispatch();

  const movies = useSelector(state => selectMoviesByCategory(state, category));
  const loading = useSelector(state => state.movies.loading);
  const isInitialized = useSelector(state => state.movies.isInitialized);

  useEffect(() => {
    if (!isInitialized && !loading) {
      dispatch(fetchMovies());
    }
  }, [dispatch, isInitialized, loading]);

  return {
    movies,
    loading,
    refetch: () => dispatch(fetchMovies())
  };
};

