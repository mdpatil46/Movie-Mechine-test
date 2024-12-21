import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, setCurrentPage  } from '../Redux/Posts/PostsSlice';
import { Link } from 'react-router-dom';
import MovieCard from '../Component/MovieCard';
import Pagination from '../Component/Pagination';

const App = () => {
  const { popularMovies, status, error, totalPages, currentPage } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page)); 
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {popularMovies?.length > 0 ? (
        popularMovies.map((movie) => (
          <Link to={`/single-movie/${movie.id}`} key={movie.id}>
          <MovieCard
            key={movie.id}
            imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
          />
          </Link>
        ))
      ) : (
        <div>No movies available.</div>
      )}
    </div>
    {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}  
        />
      )}
  </div>
  
  );
};

export default App;
