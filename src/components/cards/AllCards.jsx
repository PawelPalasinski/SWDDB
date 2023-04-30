import React, { useEffect, lazy, Suspense } from "react";
import styled from "styled-components";

import useCardStore from "../../store/cardStore";
import usePaginationStore from "../../store/paginationStore";
import useFilterStore from "../../store/filterStore";
import useCardCountStore from "../../store/cardCountStore";

const CardImage = lazy(() => import("../cardImage/CardImage"));
import Jedi from "../svg/Jedi";

const CardWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
  }
  li {
    position: relative;
    margin: 10px;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    line-height: 0;
  }
`;

const CardButton = styled.button`
  position: absolute;
  bottom: -20px;
  right: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  color: #ffffff;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  & p {
    margin-left: -37.5px;
  }
`;

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
  const setStoreCardRedCount = useCardCountStore(
    (state) => state.setCardRedCount
  );
  const setStoreCardYellowCount = useCardCountStore(
    (state) => state.setCardYellowCount
  );
  const setStoreCardBlueCount = useCardCountStore(
    (state) => state.setCardBlueCount
  );
  const setStoreCardGrayCount = useCardCountStore(
    (state) => state.setCardGrayCount
  );

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
  const cardRedCount = filteredData.filter(
    (x) => x.faction_code === "red"
  ).length;
  const cardYellowCount = filteredData.filter(
    (x) => x.faction_code === "yellow"
  ).length;
  const cardBlueCount = filteredData.filter(
    (x) => x.faction_code === "blue"
  ).length;
  const cardGrayCount = filteredData.filter(
    (x) => x.faction_code === "gray"
  ).length;

  useEffect(() => {
    setStoreCardCount(cardCount);
    setStoreCardRedCount(cardRedCount);
    setStoreCardYellowCount(cardYellowCount);
    setStoreCardBlueCount(cardBlueCount);
    setStoreCardGrayCount(cardGrayCount);
  }, [
    cardCount,
    cardRedCount,
    cardYellowCount,
    cardBlueCount,
    cardGrayCount,
    setStoreCardCount,
    setStoreCardRedCount,
    setStoreCardYellowCount,
    setStoreCardBlueCount,
    setStoreCardGrayCount,
  ]);

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
    <CardWrapper>
      <ul>
        {currentData.map((item) => (
          <li key={item.code}>
            <Suspense fallback={<div>Loading...</div>}>
              <CardImage
                className="image"
                src={item.imagesrc}
                alt={item.name}
              />
            </Suspense>
            <CardButton onClick={() => handleCardClick(item.code)}>
              <Jedi />
              <p>ADD</p>
            </CardButton>
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
    </CardWrapper>
  );
};

export default AllCards;
