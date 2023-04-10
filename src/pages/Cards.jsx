import React, { useState, useEffect } from "react";
import AllCards from "../components/cards/AllCards";
import FactionChangeOptions from "../components/options/FactionChangeOptions";
import RarityChangeOptions from "../components/options/RarityChangeOptions";
import ExpansionChangeOptions from "../components/options/ExpansionChangeOptions";
import SearchByName from "../components/options/SearchByName";
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
  const [selectedExpansion, setSelectedExpansion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <SearchByName
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div>
        <FactionChangeOptions
          filterFactionOptions={filterFactionOptions}
          selectedFaction={selectedFaction}
          setSelectedFaction={setSelectedFaction}
        />

        <RarityChangeOptions
          filterRarityOptions={filterRarityOptions}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
        />

        <ExpansionChangeOptions
          filterExpansionOptions={filterExpansionOptions}
          selectedExpansion={selectedExpansion}
          setSelectedExpansion={setSelectedExpansion}
        />
      </div>

      <AllCards
        dataPerPage={20}
        data={data}
        selectedFaction={selectedFaction}
        selectedRarity={selectedRarity}
        selectedExpansion={selectedExpansion}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default Cards;
