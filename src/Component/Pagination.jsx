import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination flex justify-center mt-6">
      <button
        className="px-4 py-2 mx-2 bg-gray-700 text-white rounded"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="text-white px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>

      <button
        className="px-4 py-2 mx-2 bg-gray-700 text-white rounded"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

