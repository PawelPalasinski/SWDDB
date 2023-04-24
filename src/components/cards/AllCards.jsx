import React, { useEffect, lazy, Suspense } from "react";

import useCardStore from "../../store/cardStore";
import usePaginationStore from "../../store/paginationStore";
import useFilterStore from "../../store/filterStore";
import useCardCountStore from "../../store/cardCountStore";

const CardImage = lazy(() => import("./CardImage"));
import Jedi from "../svg/Jedi";

const AllCards = ({ handleCardClick }) => {
  const data = useCardStore((state) => state.data);

  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const dataPerPage = usePaginationStore((state) => state.dataPerPage);

  const selectedFaction = useFilterStore((state) => state.selectedFaction);
  const selectedRarity = useFilterStore((state) => state.selectedRarity);
  const selectedExpansion = useFilterStore((state) => state.selectedExpansion);
  const searchQuery = useFilterStore((state) => state.searchQuery);

  const setStoreCardCount = useCardCountStore((state) => state.setCardCount);

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

  const cardCount = filteredData.length;

  useEffect(() => {
    setStoreCardCount(cardCount);
    console.log(cardCount);
  }, [cardCount, setStoreCardCount]);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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
