import React, { useState } from "react";
import styled from "styled-components";

import Cards from "../components/cards/Cards";
import SearchByName from "../components/filters/SearchByName";
import CardCounter from "../components/cardCounter/CardCounter";
import Modal from "../components/modal/Modal";
import Filters from "../components/filters/Filters";
import Footer from "../components/footer/Footer";

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
  margin-top: -60px;
`;

const PageContainer = styled.div`
  height: auto;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
`;

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.showFilters ? "#ff0000" : "#00ff00")};
  color: #ffffff;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  text-shadow: 1px 1px 2px #000, 0 0 1em red, 0 0 0.2em #000;
  width: 160px;
  height: 40px;
`;

const StyledFooter = styled.footer`
  width: 100%;
`;

import useCollectionStore from "../store/collectionStore";

const CardsPage = () => {
  const [showFilters, setShowFilters] = useState(false);

  const { handleAddOrRemoveFromCollection } = useCollectionStore();

  const handleCardClick = (card) => {
    handleAddOrRemoveFromCollection(card);
  };

  const handleCardCountChange = (count) => {
    setCardCount(count);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <PageContainer>
      <CardCounterContainer>
        <CardCounter />
      </CardCounterContainer>

      <FiltersContainer>
        <SearchContainer>
          <SearchByName type="text" placeholder="Search by name" />
        </SearchContainer>

        <ToggleButton onClick={handleToggleFilters} showFilters={showFilters}>
          {showFilters ? "Hide filters" : "Show filters"}
        </ToggleButton>
      </FiltersContainer>

      <Modal isOpen={showFilters} onClose={handleToggleFilters}>
        <Filters />
      </Modal>

      <Cards
        onCardCountChange={handleCardCountChange}
        handleCardClick={handleCardClick}
      />

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </PageContainer>
  );
};

export default CardsPage;
