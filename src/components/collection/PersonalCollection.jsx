// import React, { lazy, Suspense, useEffect, useState } from "react";
// import useUserStore from "../../store/userStore";
// import useCardStore from "../../store/cardStore";
// import InfiniteScroll from "react-infinite-scroll-component";
// import styled from "styled-components";

// const CardImage = lazy(() => import("../cardImage/CardImage"));

// const PAGE_SIZE = 10;

// const CollectionWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   margin: 0 auto;
//   max-width: 1200px;
// `;

// const CardList = styled.ul`
//   list-style: none;
//   padding: 0;
//   padding: 0 20px;
//   min-height: calc(100vh - 120px - 110px);
//   width: 100%;
// `;

// const CollectionCardsWrapper = styled.div`
//   max-width: 1200px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: flex-start;

//   li {
//     position: relative;
//     margin: 10px;
//     align-items: center;
//     background-color: #ffffff;
//     box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
//     border-radius: 8px;
//     line-height: 0;
//   }
// `;

// const LoadingMessage = styled.div`
//   font-size: 16px;
//   color: #999;
// `;

// const Overlay = styled.div`
//   position: absolute;
//   border-radius: 7px;
//   width: 100%;
//   height: 0;
//   bottom: 100%;
//   left: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.9);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: 0.5s ease;
//   overflow: hidden;

//   li:hover & {
//     bottom: 0;
//     height: 100%;
//   }
// `;

// const OverlayText = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   margin-top: -40%;

//   & p {
//     font-size: 12px;
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     word-break: break-word;
//   }
// `;

// const PersonalCollection = () => {
//   const isLoggedIn = useUserStore((state) => state.isLoggedIn);
//   const loggedInUser = useUserStore((state) => state.loggedInUser);
//   const userCollection = useUserStore((state) => state.loggedInUser.collection);
//   const data = useCardStore((state) => state.data);

//   const collection = isLoggedIn ? loggedInUser.collection : [];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredData, setFilteredData] = useState([]);

//   const [scrollProgress, setScrollProgress] = useState(0);

//   const handleScroll = () => {
//     const windowHeight = window.innerHeight;
//     const fullHeight = document.documentElement.scrollHeight;
//     const scrolledHeight = window.scrollY;
//     const visibleHeight = windowHeight + scrolledHeight;
//     const progress = (visibleHeight / fullHeight) * 100;
//     setScrollProgress(progress);
//     console.log(progress);
//   };

//   useEffect(() => {
//     const startIndex = (currentPage - 1) * PAGE_SIZE;
//     const endIndex = startIndex + PAGE_SIZE;
//     const filteredCardCodes = collection.map((card) => card.cardCode);
//     const uniqueCardCodes = [...new Set(filteredCardCodes)];

//     const newData = data
//       .filter((item) => uniqueCardCodes.includes(item.code))
//       .slice(startIndex, endIndex);

//     setFilteredData(() => [...newData]);
//   }, [collection, data, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const loadMoreData = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const hasMore = currentPage * PAGE_SIZE <= collection.length;

//   return (
//     <CollectionWrapper>
//       <CardList>
//         <InfiniteScroll
//           dataLength={filteredData.length}
//           next={loadMoreData}
//           hasMore={hasMore}
//           loader={<LoadingMessage>Loading...</LoadingMessage>}
//           endMessage={<LoadingMessage>No more data to load</LoadingMessage>}
//         >
//           <CollectionCardsWrapper>
//             {filteredData.map((item, index) => (
//               <li key={`${item.code}-${index}`}>
//                 <Suspense
//                   fallback={<LoadingMessage>Loading...</LoadingMessage>}
//                 >
//                   <CardImage
//                     className="image"
//                     src={item.imagesrc}
//                     alt={item.name}
//                   />
//                 </Suspense>

//                 <Overlay>
//                   <OverlayText>
//                     <p>{item.name}</p>
//                     <p>{item.faction_code}</p>
//                     <p>{item.set_name}</p>
//                   </OverlayText>
//                 </Overlay>
//               </li>
//             ))}
//           </CollectionCardsWrapper>
//         </InfiniteScroll>
//       </CardList>
//     </CollectionWrapper>
//   );
// };

// export default PersonalCollection;

import React, { lazy, Suspense, useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useCardStore from "../../store/cardStore";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const CardImage = lazy(() => import("../cardImage/CardImage"));

const PAGE_SIZE = 10;

const CollectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  padding: 0 20px;
  min-height: calc(100vh - 120px - 110px);
  width: 100%;
`;

const CollectionCardsWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

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
    font-size: 12px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

const StarContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 20px;
  color: ${({ filled }) => (filled ? "#fcd91d" : "#999")};
`;

const PersonalCollection = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const userCollection = useUserStore((state) => state.loggedInUser.collection);
  const data = useCardStore((state) => state.data);

  const collection = isLoggedIn ? loggedInUser.collection : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

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

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const filteredCardCodes = collection.map((card) => card.cardCode);
    const uniqueCardCodes = [...new Set(filteredCardCodes)];

    const newData = data
      .filter((item) => uniqueCardCodes.includes(item.code))
      .slice(startIndex, endIndex);

    setFilteredData(() => [...newData]);
  }, [collection, data, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const hasMore = currentPage * PAGE_SIZE <= collection.length;

  const handleStarClick = (cardCode, rating) => {
    if (!isLoggedIn) {
      // Obsługa dla niezalogowanego użytkownika
      return;
    }

    // Tutaj można dodać logikę aktualizacji oceny karty
  };

  const handleAddToCollection = (cardCode) => {
    if (!isLoggedIn) {
      // Obsługa dla niezalogowanego użytkownika
      return;
    }

    // Tutaj można dodać logikę dodawania karty do kolekcji
  };

  const handleRemoveFromCollection = (cardCode) => {
    if (!isLoggedIn) {
      // Obsługa dla niezalogowanego użytkownika
      return;
    }

    // Tutaj można dodać logikę usuwania karty z kolekcji
  };

  return (
    <CollectionWrapper>
      <CardList>
        <CollectionCardsWrapper>
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
                  <p>{item.name}</p>
                  <p>{item.set_name}</p>

                  <StarContainer>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        filled={rating <= item.rating}
                        onClick={() => handleStarClick(item.code, rating)}
                      >
                        ★
                      </Star>
                    ))}
                  </StarContainer>

                  <button onClick={() => handleRemoveFromCollection(item.code)}>
                    Remove from Collection
                  </button>
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
