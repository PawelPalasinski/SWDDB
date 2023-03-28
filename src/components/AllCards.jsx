// import React, { useState } from 'react';
import React, { useState, lazy, Suspense } from "react";

const CardImage = lazy(() => import("./CardImage"));



const AllCards = ({ dataPerPage, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / dataPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>


      <ul>
        {currentData.map((item) => (
          <li key={item.code}>
            <p>{item.name}</p>
            <Suspense fallback={<div>Loading...</div>}>
            <CardImage className="image" src={item.imagesrc} alt={item.name} />
            </Suspense>
            </li>
            
        ))}
      </ul>

      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AllCards;
