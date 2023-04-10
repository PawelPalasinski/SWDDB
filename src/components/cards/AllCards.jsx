import React, { useState, lazy, Suspense } from "react";

const CardImage = lazy(() => import("./CardImage"));

const AllCards = ({
  dataPerPage,
  data,
  selectedFaction,
  selectedRarity,
  selectedExpansion,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / dataPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  let filteredData = data.filter((item) => {
    if (
      selectedFaction &&
      selectedFaction !== "all" &&
      item.faction_code !== selectedFaction
    ) {
      return false;
    }

    if (
      selectedRarity &&
      selectedRarity !== "all" &&
      item.rarity_code !== selectedRarity
    ) {
      return false;
    }

    if (
      selectedExpansion &&
      selectedExpansion !== "all" &&
      item.set_code !== selectedExpansion
    ) {
      return false;
    }

    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      console.log("query false" + searchQuery);
      return false;
    }
    console.log("query true" + searchQuery);
    return true;
  });

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <ul>
        {currentData.map((item) => (
          <li key={item.code}>
            <p>{item.name}</p>
            <p>{item.faction_code}</p>
            <p>{item.set_name}</p>
            <Suspense fallback={<div>Loading...</div>}>
              <CardImage
                className="image"
                src={item.imagesrc}
                alt={item.name}
              />
            </Suspense>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCards;
