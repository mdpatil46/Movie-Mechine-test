import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies, setCurrentPage } from '../Redux/Posts/PostsSlice';
import Pagination from '../Component/Pagination';
import { Link } from 'react-router-dom'; 
import MovieCard from '../Component/MovieCard';

function UpcomingMovie() {
  const dispatch = useDispatch()
  const { upcomingMovies, status, error, totalPages, currentPage } = useSelector((state) => state.movies);
  
    useEffect(() => {
      dispatch(fetchUpcomingMovies(currentPage));
    }, [dispatch, currentPage]);

      const handlePageChange = (page) => {
        dispatch(setCurrentPage(page)); 
      };
    
  
    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;
  return (
    <>
    <div className="bg-gray-900 min-h-screen p-10 ">
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     {upcomingMovies && upcomingMovies.length > 0 ? ( upcomingMovies.map((movie) => (
        <Link to={`/single-movie/${movie.id}`} key={movie.id}>
       <MovieCard 
     key={movie.id}
     imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
     title={movie.title}
     rating={movie.vote_average}
        />
        </Link>
     ))):(
      <div>No movies available.</div>
    )
     } 
   </div>
   {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}  
        />
      )}
 </div>
    </>
  )
}

export default UpcomingMovie
