import React, { Children, lazy, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/userStore";
import useCardStore from "../../store/cardStore";

const CardImage = lazy(() => import("../cardImage/CardImage"));
import Sith from "../svg/Sith";
import Rating from "./Rating";

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
  margin-top: -40%;

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

const PersonalCollection = ({ collection, handleCardClick }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const data = useCardStore((state) => state.data);

  const [filteredData, setFilteredData] = useState([]);
  const [removedCard, setRemovedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filteredCardCodes = collection.map((card) => card.cardCode);
    const uniqueCardCodes = [...new Set(filteredCardCodes)];

    const newData = data.filter((item) => uniqueCardCodes.includes(item.code));

    setFilteredData(() => [...newData]);
    setLoading(false);
  }, [collection, data]);

  console.log("COL " + collection.rate);
  console.log("LEN" + collection.length);

  const handleButtonClick = (cardCode) => {
    handleCardClick(cardCode);
  };

  const handleRateChange = (cardCode, rate) => {
    if (!isLoggedIn) {
      return;
    }

    const updatedCollection = [...loggedInUser.collection];
    const cardIndex = updatedCollection.findIndex(
      (card) => card.cardCode === cardCode
    );

    if (cardIndex !== -1) {
      updatedCollection[cardIndex] = {
        ...updatedCollection[cardIndex],
        rate: rate,
      };

      const updatedUser = { ...loggedInUser, collection: updatedCollection };

      useUserStore.getState().setUserCollection(updatedUser.collection);

      const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
      const updatedUsers = usersFromLocalStorage.map((user) => {
        if (user.login === loggedInUser.login) {
          return updatedUser;
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <CollectionWrapper>
      <CardList>
        <CollectionCardsWrapper removed={removedCard === null ? 0 : 1}>
          {filteredData.map((item, index) => (
            <li key={`${item.code}-${index}`}>
              <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
                <CardImage
                  className="image"
                  src={item.imagesrc}
                  alt={item.name}
                />
              </Suspense>

              <Overlay>
                <OverlayText>
                  <p>
                    {item.name.length > 15
                      ? item.name.slice(0, 12) + "..."
                      : item.name}
                  </p>
                  <p>{item.set_name}</p>

                  <Rating
                    cardCode={item.cardCode}
                    rate={item.rate}
                    onRateChange={handleRateChange}
                  />

                  <CardButton onClick={() => handleButtonClick(item.code)}>
                    <Sith />
                    <span>DEL</span>
                  </CardButton>
                </OverlayText>
              </Overlay>
            </li>
          ))}
        </CollectionCardsWrapper>
      </CardList>
    </CollectionWrapper>
  );
};

export default PersonalCollection;
