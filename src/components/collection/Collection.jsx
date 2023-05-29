import React, { lazy, Suspense, useEffect, useState } from "react";
import useStore from "../../store/collectionStore";
import useCardStore from "../../store/cardStore";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const CardImage = lazy(() => import("../cardImage/CardImage"));

const PAGE_SIZE = 10;

const CollectionWrapper = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #333;
    margin-right: 10px;
  }
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: #999;
`;

function Collection() {
  const collection = useStore((state) => state.collection);
  const data = useCardStore((state) => state.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newData = data
      .filter((item) => collection.includes(item.code))
      .slice(startIndex, endIndex);
    setFilteredData((prevData) => [...prevData, ...newData]);
  }, [collection, data, currentPage]);

  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const hasMore = filteredData.length < data.length;

  return (
    <CollectionWrapper>
      <p>My Collection:</p>
      <InfiniteScroll
        dataLength={filteredData.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<LoadingMessage>Loading...</LoadingMessage>}
        endMessage={<LoadingMessage>No more data to load</LoadingMessage>}
      >
        {filteredData.map((item) => (
          <li key={item.code}>
            <p>{item.name}</p>
            <p>{item.code}</p>
            <p>{item.faction_code}</p>
            <p>{item.set_name}</p>
            <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>}>
              <CardImage
                className="image"
                src={item.imagesrc}
                alt={item.name}
              />
            </Suspense>
          </li>
        ))}
      </InfiniteScroll>
    </CollectionWrapper>
  );
}

export default Collection;
