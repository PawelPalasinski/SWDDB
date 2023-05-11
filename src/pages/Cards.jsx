import React, { useState } from "react";
import styled from "styled-components";

import AllCards from "../components/cards/AllCards";
import SearchByName from "../components/filters/SearchByName";
import CardCounter from "../components/cardCounter/CardCounter";
import Filters from "../components/filters/Filters";
import Notification from "../components/notification/Notification";

const CardCounterContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

const PageContainer = styled.div`
  overflow-y: scroll;
  height: auto;
`;

import useCollectionStore from "../store/collectionStore";

const Cards = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  const { handleAddOrRemoveFromCollection } = useCollectionStore();

  // const handleCardClick = (card) => {
  //   handleAddOrRemoveFromCollection(card);
  // };

  const handleCardClick = (card) => {
    handleAddOrRemoveFromCollection(card);
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 1000);
  };

  const handleCardCountChange = (count) => {
    setCardCount(count);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <PageContainer>
      {buttonClicked ? <Notification /> : null}
      <CardCounterContainer>
        <CardCounter />
      </CardCounterContainer>

      <div>
        <SearchByName />
      </div>

      <button onClick={handleToggleFilters}>
        {showFilters ? "Ukryj filtry" : "Pokaż filtry"}{" "}
      </button>

      {showFilters && <Filters />}

      <AllCards
        onCardCountChange={handleCardCountChange}
        handleCardClick={handleCardClick}
      />
    </PageContainer>
  );
};

export default Cards;
