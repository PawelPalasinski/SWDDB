import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/userStore";

import CardImage from "../cardImage/CardImage";
import Modal from "../modal/Modal";
import Rating from "./Rating";

import Sith from "../svg/Sith";
import Fullscreen from "../svg/Fullscreen";

const CollectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  margin-top: 120px;
`;

const CardList = styled.ul`
  list-style: none;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  min-height: calc(100vh - 120px - 110px);
  width: 100%;
  justify-content: space-between;
`;

const CollectionCardsWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  li {
    position: relative;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    line-height: 0;
    animation: ${({ removed }) => (removed ? "fadeOut 0.5s forwards" : "none")};
  }
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: #999;
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
  margin-top: -60%;

  & p {
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
    font-size: 12px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
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
  margin-top: 120%;

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
  }
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
  margin-top: -70%;
  width: 40px;
`;

const PersonalCollection = ({ collection, handleCardClick }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const handleAddOrRemoveFromCollection = useUserStore(
    (state) => state.handleAddOrRemoveFromCollection
  );
  const setRating = useUserStore((state) => state.setRating);
  const getButtonText = useUserStore((state) => state.getButtonText);

  const [localCollection, setLocalCollection] = useState(collection);

  useEffect(() => {
    setLocalCollection(collection);
  }, [collection]);

  useEffect(() => {
    setLocalCollection(collection);
  }, [collection]);

  const handleRateChange = (cardCode, rate) => {
    if (!isLoggedIn) {
      return;
    }

    setRating(loggedInUser.login, cardCode, rate);

    const updatedCollection = localCollection.map((card) => {
      if (card.cardCode === cardCode) {
        return { ...card, rate };
      }
      return card;
    });

    setLocalCollection(updatedCollection);
  };

  const handleAddOrRemove = (card) => {
    if (!isLoggedIn) {
      return;
    }

    const { cardCode, rate, cardImage, cardName } = card;
    handleAddOrRemoveFromCollection(
      loggedInUser.login,
      cardCode,
      rate,
      cardImage,
      cardName
    );
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (cardImage) => {
    setSelectedImage(cardImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CollectionWrapper>
      <CardList>
        <CollectionCardsWrapper>
          {collection.map((item, index) => (
            <li key={`${item.cardCode}-${index}`}>
              <CardImage
                className="image"
                src={item.cardImage}
                alt={item.cardName}
              />

              <Overlay>
                <OverlayText>
                  <p>
                    {item.cardName.length > 15
                      ? item.cardName.slice(0, 12) + "..."
                      : item.cardName}
                  </p>
                  <p>{item.setName}</p>

                  <Rating
                    cardCode={item.cardCode}
                    rate={item.rate}
                    onRateChange={handleRateChange}
                  />

                  <CardButton onClick={() => handleAddOrRemove(item)}>
                    <Sith />
                    <span>{getButtonText(item.cardCode)}</span>
                  </CardButton>
                </OverlayText>

                <FullscreenButton onClick={() => openModal(item.cardImage)}>
                  <Fullscreen />
                </FullscreenButton>
              </Overlay>
            </li>
          ))}
        </CollectionCardsWrapper>
      </CardList>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <img src={selectedImage} alt="Fullscreen" />
      </Modal>
    </CollectionWrapper>
  );
};

export default PersonalCollection;
