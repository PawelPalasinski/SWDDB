import React, { useState, useEffect } from "react";
import AllCards from "../components/cards/AllCards";
import FactionChangeOptions from "../components/filters/FactionChangeOptions";
import RarityChangeOptions from "../components/filters/RarityChangeOptions";
import ExpansionChangeOptions from "../components/filters/ExpansionChangeOptions";
import SearchByName from "../components/filters/SearchByName";
import CardCounter from "../components/cardCounter/CardCounter";
import Loader from "../components/loader/Loader";

import useCardStore from "../store/cardStore";
import useCollectionStore from "../store/collectionStore";

function Cards() {
  const { isLoading, fetchData } = useCardStore();
  const [showFilters, setShowFilters] = useState(true);

  const { handleAddOrRemoveFromCollection } = useCollectionStore();

  const handleCardClick = (card) => {
    handleAddOrRemoveFromCollection(card);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCardCountChange = (count) => {
    setCardCount(count);
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div>
        <CardCounter />
      </div>

      <div>
        <SearchByName />
      </div>

      <button onClick={handleToggleFilters}>
        {showFilters ? "Ukryj filtry" : "Pokaż filtry"}{" "}
      </button>

      {showFilters && (
        <div>
          <FactionChangeOptions />
          <RarityChangeOptions />
          <ExpansionChangeOptions />
        </div>
      )}

      <AllCards
        onCardCountChange={handleCardCountChange}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default Cards;
