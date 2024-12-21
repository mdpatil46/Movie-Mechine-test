import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    console.log(response,"response1");
    
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    const data = await response.json();
    return {
      results: data.results,
      totalPages: data.total_pages, 
    };
 
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  }
);

export const fetchMovieCastDetails = createAsyncThunk(
  'movies/fetchMovieCastDetails',
  async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) throw new Error('Failed to fetch movie cast details');
    return await response.json();
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch upcoming movies');
    const data = await response.json();
    return {
      results: data.results,
      totalPages: data.total_pages, 
    };
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch top-rated movies');
    const data = await response.json();
    return {
      results: data.results,
      totalPages: data.total_pages, 
    };
  }
);

export const fetchSearchResults = createAsyncThunk(
  'movies/fetchSearchResults',
  async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`);
    if (!response.ok) throw new Error('Failed to fetch search results');
    return await response.json();
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    totalPages: 0, 
    currentPage: 1,
    movieDetails: null,
    movieCast: [],
    upcomingMovies: [],
    topRatedMovies: [],
    searchResults: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popularMovies = action.payload.results;
        state.totalPages = action.payload.totalPages; 
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieCastDetails.fulfilled, (state, action) => {
        state.movieCast = action.payload.cast;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload.results;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies = action.payload.results;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload.results;
      });
  },
});

export const {setCurrentPage} = moviesSlice.actions
export default moviesSlice.reducer;

