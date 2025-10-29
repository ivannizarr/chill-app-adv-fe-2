import { create } from 'zustand';
import { movieApi } from '../services/api';
import toast from 'react-hot-toast';

let isCurrentlyFetching = false;

const useMovieStore = create((set, get) => ({
  movies: [],
  loading: false,
  error: null,
  selectedMovie: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  fetchMovies: async () => {
    const { movies } = get();
    if (isCurrentlyFetching) {
      return movies;
    }

    if (movies.length > 0) {
      return movies;
    }
    isCurrentlyFetching = true;
    set({ loading: true, error: null });

    try {
      const data = await movieApi.getData();
      const validMovies = data.filter(movie =>
        movie.title &&
        movie.img &&
        movie.id &&
        typeof movie.title === 'string'
      );
      set({ movies: validMovies, loading: false });
      return validMovies;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Gagal memuat data film');
      throw error;
    } finally {
      isCurrentlyFetching = false;
    }
  },

  fetchMovieById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await movieApi.getDataById(id);
      set({ selectedMovie: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Gagal memuat detail film');
      throw error;
    }
  },

  // ADD
  addMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const newMovie = await movieApi.addData(movieData);
      set(state => ({
        movies: [...state.movies, newMovie],
        loading: false
      }));
      toast.success('Film berhasil ditambahkan!');
      return newMovie;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Gagal menambah film');
      throw error;
    }
  },

  // UPDATE
  updateMovie: async (id, movieData) => {
    set({ loading: true, error: null });
    try {
      const updatedMovie = await movieApi.updateData(id, movieData);
      set(state => ({
        movies: state.movies.map(movie =>
          movie.id === id ? updatedMovie : movie
        ),
        selectedMovie: state.selectedMovie?.id === id ? updatedMovie : state.selectedMovie,
        loading: false
      }));
      toast.success('Film berhasil diperbarui!');
      return updatedMovie;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Gagal memperbarui film');
      throw error;
    }
  },

  // DELETE
  deleteMovie: async (id) => {
    set({ loading: true, error: null });
    try {
      await movieApi.deleteData(id);
      set(state => ({
        movies: state.movies.filter(movie => movie.id !== id),
        loading: false
      }));
      toast.success('Film berhasil dihapus!');
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Gagal menghapus film');
      throw error;
    }
  },

  getMoviesByCategory: (category) => {
    const { movies } = get();
    return movies.filter(movie => movie.category === category);
  },
  getGroupedMovies: () => {
    const { movies } = get();
    const grouped = {
      continueWatching: [],
      topRating: [],
      trending: [],
      newReleases: []
    };

    movies.forEach(movie => {
      if (!movie.title || !movie.img || !movie.id) return;
      switch(movie.category) {
        case 'continueWatching':
          grouped.continueWatching.push(movie);
          break;
        case 'topRating':
          grouped.topRating.push(movie);
          break;
        case 'trending':
          grouped.trending.push(movie);
          break;
        case 'newReleases':
          grouped.newReleases.push(movie);
          break;
        default:
          if (movie.category === null) {
            grouped.newReleases.push(movie);
          }
      }
    });

    return grouped;
  }
}));

export default useMovieStore;