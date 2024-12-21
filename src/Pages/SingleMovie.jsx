import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, fetchMovieCastDetails } from '../Redux/Posts/PostsSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


const ScrollContainer = styled.div`
  display: flex;
  space-x: 6;
  padding-bottom: 4px;
  overflow-x: scroll;

  /* For WebKit-based browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;  /* Hide scrollbar */
  }

  /* For Firefox */
  scrollbar-width: none;  /* Hide scrollbar */

  /* For Internet Explorer and Edge */
  -ms-overflow-style: none;  /* Hide scrollbar */
`;


function SingleMovie() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const castContainerRef = useRef(null); // Ref for the cast container

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieCastDetails(movieId));
  }, [dispatch, movieId]);

  const { movieDetails, movieCast, status, error } = useSelector((state) => state.movies);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  if (!movieDetails || !movieCast) {
    return <div>Movie details or cast information is not available</div>;
  }

  const scrollCast = (direction) => {
    if (castContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200; // Change scroll amount if needed
      castContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="bg-gray-800 p-6 h-full">
        <div className="flex flex-col md:flex-row">
          <img
            src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : 'https://via.placeholder.com/200x300'}
            alt="Movie Poster"
            className="rounded-lg w-full h-full md:w-48 mx-auto md:mx-0"
          />
          <div className="ml-0 md:ml-6 mt-6 md:mt-0">
            <h2 className="text-3xl font-bold">{movieDetails.title}</h2>
            <p className="text-gray-400">Rating: {movieDetails.vote_average}</p>
            <p className="text-gray-400">
              {movieDetails.runtime} min | {movieDetails.genres.map(genre => genre.name).join(', ')}
            </p>
            <p className="text-gray-400">Release Date: {movieDetails.release_date}</p>
            <p className="mt-4">
              <strong>Overview:</strong> {movieDetails.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Cast section */}
      <div className="bg-gray-900 p-6">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scrollCast('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          
          <div
  className="scroll-container flex space-x-6 pb-4"
  ref={castContainerRef}
  style={{ overflowX: "scroll" }}
>
  {movieCast.map((actor, index) => (
    <div key={index} className="flex-shrink-0 w-32 sm:w-36 md:w-48 text-center">
      <img
        src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://via.placeholder.com/200x300'}
        alt={actor.name}
        className="rounded-lg mb-2 w-full h-60 object-cover"
      />
      <h3 className="font-bold text-sm sm:text-base">{actor.name}</h3>
      <p className="text-white text-xs sm:text-sm"> Character : {actor.character}</p>
    </div>
  ))}
</div>


          {/* Right Scroll Button */}
          <button
            onClick={() => scrollCast('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
