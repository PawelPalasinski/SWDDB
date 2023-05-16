import React, { useState } from "react";
import styled from "styled-components";

import AllCards from "../components/cards/AllCards";
import SearchByName from "../components/filters/SearchByName";
import CardCounter from "../components/cardCounter/CardCounter";
import Filters from "../components/filters/Filters";
import Notification from "../components/notification/Notification";

import space from "../assets/images/space.webp";
const CardCounterContainer = styled.div`
  background-image: url(${space});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  inset: 0;
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
  const [showFilters, setShowFilters] = useState(false);
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
        {showFilters ? "Show filters" : "Hide filters"}{" "}
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
