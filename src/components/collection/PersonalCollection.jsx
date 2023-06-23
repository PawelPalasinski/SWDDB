import React, { lazy, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const LoadMoreButton = styled.button`
  color: red;
  margin: 20px auto;
  display: block;
`;

const PersonalCollection = ({ handleCardClick }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const userCollection = useUserStore((state) => state.loggedInUser.collection);
  const data = useCardStore((state) => state.data);

  const collection = isLoggedIn ? loggedInUser.collection : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [removedCard, setRemovedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const scrolledHeight = window.scrollY;
    const visibleHeight = windowHeight + scrolledHeight;
    const progress = (visibleHeight / fullHeight) * 100;
    setScrollProgress(progress);
    console.log(progress);
  };

  const PAGE_SIZE = 10;

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const filteredCardCodes = collection.map((card) => card.cardCode);
    const uniqueCardCodes = [...new Set(filteredCardCodes)];

    const newData = data
      .filter((item) => uniqueCardCodes.includes(item.code))
      .slice(startIndex, endIndex);

    setFilteredData(() => [...newData]);
    setLoading(false);
  }, [collection, data, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMoreData = () => {
    setLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  console.log(collection.length);

  const hasMore = currentPage * PAGE_SIZE <= collection.length;

  const handleStarClick = (cardCode, rating) => {
    if (!isLoggedIn) {
      return;
    }

    const cardIndex = loggedInUser.collection.findIndex(
      (card) => card.cardCode === cardCode
    );
    if (cardIndex !== -1) {
      loggedInUser.collection[cardIndex].rate = rating;
      useUserStore
        .getState()
        .setRating(loggedInUser.login, loggedInUser.collection);
    }
  };

  const handleButtonClick = (cardCode) => {
    handleCardClick(cardCode);
  };

  return (
    <CollectionWrapper>
      <CardList>
        <ToastContainer />
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
                    onClick={(rating) => handleStarClick(item.code, rating)}
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

      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        hasMore && (
          <LoadMoreButton onClick={loadMoreData}>Load More</LoadMoreButton>
        )
      )}
    </CollectionWrapper>
  );
};

export default PersonalCollection;
