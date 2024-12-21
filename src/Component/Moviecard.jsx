import React from 'react';

const MovieCard = ({ imageUrl, title, rating }) => {
  return (
    <div className="w-80 bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
      <img
        src={imageUrl}
        alt={title}
        className="w-80 h-96 object-fit"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm mt-2">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
