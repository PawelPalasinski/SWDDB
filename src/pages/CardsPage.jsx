import React, { useState, useEffect } from "react";
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

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 60px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.showFilters ? "#ff0000" : "#FFD700")};
  color: #fff;
  border: none;
  border-radius: 0 2em 2em 0;
  cursor: pointer;
  text-shadow: 1px 1px 2px #000, 0 0 1em red, 0 0 0.2em #000;
  width: 160px;
  height: 40px;
`;

const StyledFooter = styled.footer`
  width: 100%;
`;

import useUserStore from "../store/userStore";

const CardsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const handleAddOrRemoveFromCollection = useUserStore(
    (state) => state.handleAddOrRemoveFromCollection
  );

  const handleCardClick = (card) => {
    console.log(card);
    if (loggedInUser) {
      handleAddOrRemoveFromCollection(loggedInUser.login, card, 0);
      setRefresh(true);
    }
  };

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
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

      <Cards handleCardClick={handleCardClick} />

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </>
  );
};

export default CardsPage;
