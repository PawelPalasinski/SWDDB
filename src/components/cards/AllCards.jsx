import React, { useEffect, lazy, Suspense } from "react";
import styled from "styled-components";

import useCardStore from "../../store/cardStore";
import usePaginationStore from "../../store/paginationStore";
import useFilterStore from "../../store/filterStore";
import useCardCountStore from "../../store/cardCountStore";
import useCollectionStore from "../../store/collectionStore";

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
  margin-top: 80%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Overlay = styled.div`
  position: absolute;

  width: 100%;
  height: 0;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;
  overflow: hidden;

  li:hover & {
    bottom: 0;
    height: 100%;
  }

  button {
    visibility: hidden;
  }

  &:hover button {
    visibility: visible;
  }
`;

const OverlayText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -40%;
  & p {
    font-size: 10px;
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

  const getButtonText = useCollectionStore((state) => state.getButtonText);

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

            <Overlay>
              <OverlayText>
                <p>{item.name}</p>
                <p>{item.set_name}</p>
                <p>{item.rarity_name}</p>
              </OverlayText>
              <CardButton onClick={() => handleCardClick(item.code)}>
                <Jedi />
                <span>{getButtonText(item.code)}</span>
              </CardButton>
            </Overlay>
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
