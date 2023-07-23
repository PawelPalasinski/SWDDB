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
import Fullscreen from "../svg/Fullscreen";
import Falcon from "../svg/FalconSVG";

import PaginationAllCards from "../pagination/PaginationAllCards";
import Modal from "../modal/Modal";

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

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }
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
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;

    @media (max-width: 600px) {
      font-size: 24px;
    }

    @media (min-width: 600px) {
      font-size: 12px;
    }
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

const FullscreenButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  color: #ffffff;
  text-transform: uppercase;
  transition: all 0.3s ease;
  width: 40px;

  &.horizontal-overlay-fullscreenbutton {
    margin-top: 0%;
  }

  &.vertical-overlay-fullscreenbutton {
    margin-bottom: 110%;
  }
`;

const Cards = ({ handleCardClick }) => {
  const data = useCardStore((state) => state.data);

  // Pagination

  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const dataPerPage = usePaginationStore((state) => state.dataPerPage);

  // Filters

  const selectedFaction = useFilterStore((state) => state.selectedFaction);
  const selectedRarity = useFilterStore((state) => state.selectedRarity);
  const selectedExpansion = useFilterStore((state) => state.selectedExpansion);
  const searchQuery = useFilterStore((state) => state.searchQuery);

  // Count cards

  const setStoreCardCount = useCardCountStore((state) => state.setCardCount);

  // Faction

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

  // Rarity

  const setStoreCardLCount = useCardCountStore((state) => state.setLCount);
  const setStoreCardRCount = useCardCountStore((state) => state.setRCount);
  const setStoreCardUCount = useCardCountStore((state) => state.setCCount);
  const setStoreCardCCount = useCardCountStore((state) => state.setUCount);

  // Expansion

  const setStoreCardAWCount = useCardCountStore((state) => state.setAWCount);
  const setStoreCardSoRCount = useCardCountStore((state) => state.setSoRCount);
  const setStoreCardEaWCount = useCardCountStore((state) => state.setEaWCount);
  const setStoreCardTPGCount = useCardCountStore((state) => state.setTPGCount);
  const setStoreCardLEGCount = useCardCountStore((state) => state.setLEGCount);
  const setStoreCardRIVCount = useCardCountStore((state) => state.setRIVCount);
  const setStoreCardWotFCount = useCardCountStore(
    (state) => state.setWotFCount
  );
  const setStoreCardAtGCount = useCardCountStore((state) => state.setAtGCount);
  const setStoreCardCONVCount = useCardCountStore(
    (state) => state.setCONVCount
  );
  const setStoreCardAoNCount = useCardCountStore((state) => state.setAoNCount);
  const setStoreCardSoHCount = useCardCountStore((state) => state.setSoHCount);
  const setStoreCardCMCount = useCardCountStore((state) => state.setCMCount);
  const setStoreCardTRCount = useCardCountStore((state) => state.setTRCount);

  // Filters

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

  // Count cards

  const cardCount = filteredData.length;

  // Faction

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

  // Rarity

  const cardLCount = filteredData.filter((x) => x.rarity_code === "L").length;
  const cardRCount = filteredData.filter((x) => x.rarity_code === "R").length;
  const cardUCount = filteredData.filter((x) => x.rarity_code === "U").length;
  const cardCCount = filteredData.filter((x) => x.rarity_code === "C").length;

  // Expansion

  const cardAWCount = filteredData.filter((x) => x.set_code === "AW").length;
  const cardSoRCount = filteredData.filter((x) => x.set_code === "SoR").length;
  const cardEaWCount = filteredData.filter((x) => x.set_code === "EaW").length;
  const cardTPGCount = filteredData.filter((x) => x.set_code === "TPG").length;
  const cardLEGCount = filteredData.filter((x) => x.set_code === "LEG").length;
  const cardRIVCount = filteredData.filter((x) => x.set_code === "RIV").length;
  const cardWotFCount = filteredData.filter(
    (x) => x.set_code === "WotF"
  ).length;
  const cardAtGCount = filteredData.filter((x) => x.set_code === "AtG").length;
  const cardCONVCount = filteredData.filter(
    (x) => x.set_code === "CONV"
  ).length;
  const cardAoNCount = filteredData.filter((x) => x.set_code === "AoN").length;
  const cardSoHCount = filteredData.filter((x) => x.set_code === "SoH").length;
  const cardCMCount = filteredData.filter((x) => x.set_code === "CM").length;
  const cardTRCount = filteredData.filter((x) => x.set_code === "TR").length;

  // Count cards - useEffect

  useEffect(() => {
    setStoreCardCount(cardCount);

    setStoreCardRedCount(cardRedCount);
    setStoreCardYellowCount(cardYellowCount);
    setStoreCardBlueCount(cardBlueCount);
    setStoreCardGrayCount(cardGrayCount);

    setStoreCardLCount(cardLCount);
    setStoreCardRCount(cardRCount);
    setStoreCardUCount(cardCCount);
    setStoreCardCCount(cardUCount);

    setStoreCardAWCount(cardAWCount);
    setStoreCardSoRCount(cardSoRCount);
    setStoreCardEaWCount(cardEaWCount);
    setStoreCardTPGCount(cardTPGCount);
    setStoreCardLEGCount(cardLEGCount);
    setStoreCardRIVCount(cardRIVCount);
    setStoreCardWotFCount(cardWotFCount);
    setStoreCardAtGCount(cardAtGCount);
    setStoreCardCONVCount(cardCONVCount);
    setStoreCardAoNCount(cardAoNCount);
    setStoreCardSoHCount(cardSoHCount);
    setStoreCardCMCount(cardCMCount);
    setStoreCardTRCount(cardTRCount);
  }, [
    cardCount,

    cardRedCount,
    cardYellowCount,
    cardBlueCount,
    cardGrayCount,

    cardLCount,
    cardRCount,
    cardUCount,
    cardCCount,

    cardAWCount,
    cardSoRCount,
    cardEaWCount,
    cardTPGCount,
    cardLEGCount,
    cardRIVCount,
    cardWotFCount,
    cardAtGCount,
    cardCONVCount,
    cardAoNCount,
    cardSoHCount,
    cardCMCount,
    cardTRCount,

    setStoreCardCount,
    setStoreCardRedCount,
    setStoreCardYellowCount,
    setStoreCardBlueCount,
    setStoreCardGrayCount,

    setStoreCardLCount,
    setStoreCardRCount,
    setStoreCardCCount,
    setStoreCardUCount,

    setStoreCardAWCount,
    setStoreCardSoRCount,
    setStoreCardEaWCount,
    setStoreCardTPGCount,
    setStoreCardLEGCount,
    setStoreCardRIVCount,
    setStoreCardWotFCount,
    setStoreCardAtGCount,
    setStoreCardCONVCount,
    setStoreCardAoNCount,
    setStoreCardSoHCount,
    setStoreCardCMCount,
    setStoreCardTRCount,
  ]);

  // Pagination

  const totalPages = Math.ceil(cardCount / dataPerPage);

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const getButtonText = useUserStore((state) => state.getButtonText);

  const handleButtonClick = (cardCode, cardImage, cardName) => {
    const buttonText = getButtonText(cardCode, loggedInUser);

    if (buttonText === "ADD") {
      toast.success(`Card ${cardCode} added to collection.`, {
        theme: "dark",
      });
    } else if (buttonText === "DEL") {
      toast.error(`Card ${cardCode} removed from collection.`, {
        theme: "dark",
      });
    }

    handleCardClick(cardCode, cardImage, cardName);
  };

  // Modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // card position

  const isHorizontal = (src) => {
    const img = new Image();
    img.src = src;
    return img.width > img.height;
  };

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
                isHorizontal={isHorizontal(item.imagesrc)}
              />
            </Suspense>

            <Overlay>
              <OverlayText
                className={
                  isHorizontal(item.imagesrc)
                    ? "horizontal-overlay-text"
                    : "vertical-overlay-text"
                }
              >
                <p>
                  {item.name.length > 15
                    ? item.name.slice(0, 12) + "..."
                    : item.name}
                </p>
                <p>{item.set_name}</p>
                <p>{item.code}</p>
              </OverlayText>
              {!isLoggedIn ? (
                <LoginLink>
                  <Falcon />
                  <StyledLink as={Link} to="/SWDDB/login">
                    LOGIN
                  </StyledLink>
                </LoginLink>
              ) : (
                <CardButton
                  onClick={() =>
                    handleButtonClick(item.code, item.imagesrc, item.name)
                  }
                >
                  {getButtonText(item.code) === "ADD" ? <Jedi /> : <Sith />}
                  <span>{getButtonText(item.code)}</span>
                </CardButton>
              )}
              <FullscreenButton
                onClick={() => openModal(item.imagesrc)}
                className={
                  isHorizontal(item.imagesrc)
                    ? "horizontal-overlay-fullscreenbutton"
                    : "vertical-overlay-fullscreenbutton"
                }
              >
                <Fullscreen />
              </FullscreenButton>
            </Overlay>
          </li>
        ))}
      </ul>
      <PaginationAllCards totalPages={totalPages} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <img src={selectedImage} alt="Fullscreen" />
      </Modal>
    </CardWrapper>
  );
};

export default Cards;
