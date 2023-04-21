import React, { lazy, Suspense } from "react";

const CardImage = lazy(() => import("./CardImage"));
import Jedi from "../svg/Jedi";

const AllCards = ({
  dataPerPage,
  data,
  selectedFaction,
  selectedRarity,
  selectedExpansion,
  searchQuery,
  onCardCountChange,
  currentPage,
  handlePreviousPage,
  handleNextPage,
  handleCardClick,
}) => {
  const totalPages = Math.ceil(data.length / dataPerPage);

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
      selectedExpansion.length > 0 &&
      !selectedExpansion.includes(item.set_code)
    ) {
      return false;
    }

    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const countCards = filteredData.length;

  onCardCountChange(countCards);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <ul>
        {currentData.map((item) => (
          <li key={item.code}>
            <p>{item.name}</p>
            <p>{item.code}</p>
            <p>{item.faction_code}</p>
            <p>{item.set_name}</p>
            <Suspense fallback={<div>Loading...</div>}>
              <CardImage
                className="image"
                src={item.imagesrc}
                alt={item.name}
              />
            </Suspense>
            <button onClick={() => handleCardClick(item.code)}>
              <Jedi />
            </button>
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
