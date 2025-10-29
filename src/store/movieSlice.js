import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../services/api/movieApi';

const validateMovie = (movie) => {
  return movie?.title && movie?.img && movie?.id && typeof movie.title === 'string';
};
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await movieApi.getData();
      return data.filter(validateMovie);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movies: [],
  loading: false,
  error: null,
  isInitialized: false,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, handlePending)
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.isInitialized = true;
      })
      .addCase(fetchMovies.rejected, handleRejected);
  }
});

export const selectMoviesByCategory = (state, category) => {
  return state.movies.movies.filter(movie =>
    validateMovie(movie) && movie.category === category
  );
};

export const selectGroupedMovies = (state) => {
  const movies = state.movies.movies;
  const grouped = {
    continueWatching: [],
    topRating: [],
    trending: [],
    newReleases: []
  };

  movies.forEach(movie => {
    if (!validateMovie(movie)) return;

    const category = movie.category || 'newReleases';
    if (grouped[category]) {
      grouped[category].push(movie);
    } else {
      grouped.newReleases.push(movie);
    }
  });

  return grouped;
};

export default movieSlice.reducer;