import { useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';

export const useMovies = () => {
    const store = useMovieStore();
    const { fetchMovies, movies, loading } = store;

    useEffect(() => {
        if (movies.length === 0 && !loading) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length, loading]);

    return {
        ...store,
        movies: store.movies,
        loading: store.loading,
        error: store.error,
        groupedMovies: store.getGroupedMovies(),
        fetchMovies: store.fetchMovies,
        addMovie: store.addMovie,
        updateMovie: store.updateMovie,
        deleteMovie: store.deleteMovie
    };
};

export const useMoviesByCategory = (category) => {
    const {movies, fetchMovies, loading} = useMovieStore();

    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length]);

    const filteredMovies = movies.filter((movie) => movie.category === category);

    return {
        movies: filteredMovies,
        loading,
        refetch: fetchMovies,
    };
};

export const useMovie = (id) => {
    const { selectedMovie, fetchMovieById, loading } = useMovieStore();

    useEffect(() => {
        if (id) {
            fetchMovieById(id);            
        }
    }, [id, fetchMovieById]);

    return {
        movie: selectedMovie,
        loading,
        refetch: () => fetchMovieById(id),
    };
};