import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../Redux/Posts/PostsSlice'; 

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold">MovieDb</h1>
          </div>

          
          <div className="hidden md:flex space-x-6 items-center">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/top-rated" className="hover:text-gray-300">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/upcoming" className="hover:text-gray-300">
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="hidden md:flex space-x-2 w-full max-w-xs">
            <input
              type="text"
              placeholder="Search for a movie"
              className="px-4 py-2 rounded text-black w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-blue-600 px-4 py-2 rounded ml-4 hover:bg-blue-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="space-y-2 py-2 px-4">
            <li>
              <Link to="/" className="block hover:text-gray-300">
                Popular
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="block hover:text-gray-300">
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="block hover:text-gray-300">
                Upcoming
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-2 w-full max-w-xs">
            <input
              type="text"
              placeholder="Search for a movie"
              className="px-4 py-2 rounded text-black w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-blue-600 px-4 py-2 rounded ml-4 hover:bg-blue-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
