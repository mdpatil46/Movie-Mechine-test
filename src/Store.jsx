import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../src/Redux/Posts/PostsSlice';

export const store = configureStore({
  reducer: {
    movies: postsReducer,
  },
});
