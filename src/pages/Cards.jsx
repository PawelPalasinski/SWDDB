import React, { useState, useEffect } from "react";
import AllCards from "../components/cards/AllCards";
import FactionChangeOptions from "../components/options/FactionChangeOptions";
import RarityChangeOptions from "../components/options/RarityChangeOptions";
import ExpansionChangeOptions from "../components/options/ExpansionChangeOptions";
import SearchByName from "../components/options/SearchByName";
import CardCounter from "../components/cardCounter/CardCounter";
import Loader from "../components/loader/Loader";

import fetchSWDDB from "../js/api";
import {
  filterFactionOptions,
  filterRarityOptions,
  filterExpansionOptions,
} from "../js/options";

function Cards() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedExpansion, setSelectedExpansion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardCount, setCardCount] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    fetchSWDDB()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleExpansionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedExpansion([...selectedExpansion, value]); // Add selected expansion to the list
    } else {
      setSelectedExpansion(
        selectedExpansion.filter((expansion) => expansion !== value)
      );
    }
  };

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
        <CardCounter cardCount={cardCount} />
      </div>

      <div>
        <SearchByName
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <button onClick={handleToggleFilters}>
        {showFilters ? "Ukryj filtry" : "Pokaż filtry"}{" "}
      </button>

      {showFilters && (
        <div>
          <FactionChangeOptions
            filterFactionOptions={filterFactionOptions}
            selectedFaction={selectedFaction}
            setSelectedFaction={setSelectedFaction} // Corrected prop name
          />

          <RarityChangeOptions
            filterRarityOptions={filterRarityOptions}
            selectedRarity={selectedRarity}
            setSelectedRarity={setSelectedRarity} // Corrected prop name
          />

          <ExpansionChangeOptions
            filterExpansionOptions={filterExpansionOptions}
            selectedExpansion={selectedExpansion}
            handleExpansionChange={handleExpansionChange} // Corrected prop name
          />
        </div>
      )}

      <AllCards
        dataPerPage={20}
        data={data}
        selectedFaction={selectedFaction}
        selectedRarity={selectedRarity}
        selectedExpansion={selectedExpansion}
        searchQuery={searchQuery}
        onCardCountChange={handleCardCountChange}
      />
    </div>
  );
}

export default Cards;
