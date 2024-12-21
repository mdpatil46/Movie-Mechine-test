import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { fetchSearchResults } from '../Redux/Posts/PostsSlice'; 
import MovieCard from '../Component/MovieCard';
import { Link } from 'react-router-dom'; 

const SearchPage = () => {
  const dispatch = useDispatch();
  
  
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); 
console.log(query,"query");

  
  const { searchResults, status, error } = useSelector((state) => state.movies);

 
  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query)); 
    }
  }, [dispatch, query]);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="flex justify-center mb-6">
        <h1 className="text-white text-xl">Search Results for "{query}"</h1>
      </div>

      {status === 'loading' && <div className="text-white text-center">Loading...</div>}

      {status === 'failed' && <div className="text-white text-center">Error: {error}</div>}

      {status === 'succeeded' && searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((movie) => (
            <Link to={`/single-movie/${movie.id}`} key={movie.id}>
            <MovieCard
              key={movie.id}
              imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              title={movie.title}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
              </Link>
          ))}
        </div>
      )}

      
      {status === 'succeeded' && searchResults.length === 0 && (
        <div className="text-white text-center">No results found for "{query}"</div>
      )}
    </div>
  );
};

export default SearchPage;
