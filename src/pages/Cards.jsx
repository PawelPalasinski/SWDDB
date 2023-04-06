import React, { useState, useEffect } from "react";
import AllCards from "../components/cards/AllCards";
import FactionChangeOptions from "../components/options/FactionChangeOptions";
import RarityChangeOptions from "../components/options/RarityChangeOptions";
import Loader from "../components/loader/Loader";

import fetchSWDDB from "../js/api";
import { filterFactionOptions, filterRarityOptions } from "../js/options";

function Cards() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");

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
      </div>

      <AllCards
        dataPerPage={20}
        data={data}
        selectedFaction={selectedFaction}
        selectedRarity={selectedRarity}
      />
    </div>
  );
}

export default Cards;
