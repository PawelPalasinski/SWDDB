import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useCardStore from "../../store/cardStore";
import usePaginationStore from "../../store/paginationStore";
import useFilterStore from "../../store/filterStore";
import useCardCountStore from "../../store/cardCountStore";

import useUserStore from "../../store/userStore";

const CardImage = lazy(() => import("../cardImage/CardImage"));
import Jedi from "../svg/Jedi";
import Sith from "../svg/Sith";

import PaginationAllCards from "../pagination/PaginationAllCards";
import Falcon from "../svg/FalconSVG";

const CardWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
    min-height: calc(100vh - 120px - 110px);
  }
  li {
    position: relative;
    margin: 10px;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    line-height: 0;
    height: fit-content;
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
  margin-bottom: -45%;

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
  }
`;

const Overlay = styled.div`
  position: absolute;
  border-radius: 7px;
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
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;

  li:hover & {
    bottom: 0;
    height: 100%;
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

const LoginLink = styled.div`
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
  margin-bottom: -45%;
`;

const StyledLink = styled.a`
  color: #ffd700;
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
`;

const Cards = ({ handleCardClick }) => {
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

  const totalPages = Math.ceil(cardCount / dataPerPage);

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

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const [cardCode, setCardCode] = useState("");

  const getButtonText = (cardCode, loggedInUser) => {
    if (loggedInUser) {
      const collection = loggedInUser.collection || [];
      const cardCollection = collection.map((card) => card.cardCode);
      const isCardInCollection = cardCollection.includes(cardCode);
      return isCardInCollection ? "DEL" : "ADD";
    } else {
      return "?";
    }
  };

  const handleAddToCollection = (cardCode) => {
    const loggedInUser = useUserStore.getState().loggedInUser;
    if (loggedInUser) {
      useUserStore
        .getState()
        .handleAddOrRemoveFromCollection(loggedInUser.login, cardCode, 0);
    }
    setCardCode("");
  };

  const handleRemoveFromCollection = (cardCode) => {
    const loggedInUser = useUserStore.getState().loggedInUser;
    if (loggedInUser) {
      useUserStore
        .getState()
        .handleAddOrRemoveFromCollection(loggedInUser.login, cardCode, 0);
    }
    setCardCode("");
  };

  const handleButtonClick = (cardCode) => {
    const buttonText = getButtonText(cardCode, loggedInUser);

    if (buttonText === "ADD") {
      toast.success(`Card ${cardCode} added to collection.`, {
        theme: "dark",
      });
      handleAddToCollection(cardCode);
    } else if (buttonText === "DEL") {
      toast.error(`Card ${cardCode} removed from collection.`, {
        theme: "dark",
      });
      handleRemoveFromCollection(cardCode);
    }
  };

  const loginText = "LOGIN";

  return (
    <CardWrapper>
      <ToastContainer />
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
                <p>{item.code}</p>
              </OverlayText>

              {!isLoggedIn ? (
                <LoginLink>
                  <Falcon />
                  <StyledLink as={Link} to="/SWDDB/login">
                    {loginText}
                  </StyledLink>
                </LoginLink>
              ) : getButtonText(item.code, loggedInUser) === "ADD" ? (
                <CardButton onClick={() => handleButtonClick(item.code)}>
                  <Jedi />
                  <span>{getButtonText(item.code, loggedInUser)}</span>
                </CardButton>
              ) : (
                <CardButton onClick={() => handleButtonClick(item.code)}>
                  <Sith />
                  <span>{getButtonText(item.code, loggedInUser)}</span>
                </CardButton>
              )}
            </Overlay>
          </li>
        ))}
      </ul>
      <PaginationAllCards totalPages={totalPages} />
    </CardWrapper>
  );
};

export default Cards;
