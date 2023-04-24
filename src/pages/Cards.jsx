import React, { useState } from "react";
import AllCards from "../components/cards/AllCards";
import FactionChangeOptions from "../components/filters/FactionChangeOptions";
import RarityChangeOptions from "../components/filters/RarityChangeOptions";
import ExpansionChangeOptions from "../components/filters/ExpansionChangeOptions";
import SearchByName from "../components/filters/SearchByName";
import CardCounter from "../components/cardCounter/CardCounter";

import useCollectionStore from "../store/collectionStore";

function Cards() {
  const [showFilters, setShowFilters] = useState(true);

  const { handleAddOrRemoveFromCollection } = useCollectionStore();

  const handleCardClick = (card) => {
    handleAddOrRemoveFromCollection(card);
  };

  const handleCardCountChange = (count) => {
    setCardCount(count);
  };

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
