import React, { lazy, Suspense, useEffect, useState } from "react";
import useStore from "../../store/collectionStore";
import useCardStore from "../../store/cardStore";
import InfiniteScroll from "react-infinite-scroll-component";

const CardImage = lazy(() => import("../cardImage/CardImage"));

const PAGE_SIZE = 10; // Rozmiar strony

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
    <ul>
      My Collection:
      <InfiniteScroll
        dataLength={filteredData.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<div>No more data to load</div>}
      >
        {filteredData.map((item) => (
          <li key={item.code}>
            <p>{item.name}</p>
            <p>{item.code}</p>
            <p>{item.faction_code}</p>
            <p>{item.set_name}</p>
            <Suspense fallback={<div>Loading...</div>}>
              <CardImage
                className="image"
                src={item.imagesrc}
                alt={item.name}
              />
            </Suspense>
          </li>
        ))}
      </InfiniteScroll>
    </ul>
  );
}

export default Collection;
