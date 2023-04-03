import React, { useState, useEffect } from "react";
import "./App.css";
import AllCards from "./components/AllCards";
import fetchSWDDB from "./js/api";

function App() {
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

  const filterOptions = [
    { value: "all", label: "All Factions" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "gray", label: "Gray" },
  ];

  const handleFactionChange = (event) => {
    setSelectedFaction(event.target.value);
  };

  const renderFilterButtons = () => {
    return filterOptions.map((option) => {
      return (
        <button
          key={option.value}
          className={selectedFaction === option.value ? "active" : ""}
          onClick={() => setSelectedFaction(option.value)}
        >
          {option.label}
        </button>
      );
    });
  };

  const handleRarityChange = (rarity) => {
    setSelectedRarity(rarity);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {renderFilterButtons()}
        <div>
          <button
            className={selectedRarity === "all" ? "selected" : ""}
            onClick={() => handleRarityChange("all")}
          >
            All Rarity
          </button>
          <button
            className={selectedRarity === "L" ? "selected" : ""}
            onClick={() => handleRarityChange("L")}
          >
            L
          </button>
          <button
            className={selectedRarity === "R" ? "selected" : ""}
            onClick={() => handleRarityChange("R")}
          >
            R
          </button>
          <button
            className={selectedRarity === "U" ? "selected" : ""}
            onClick={() => handleRarityChange("U")}
          >
            U
          </button>
          <button
            className={selectedRarity === "C" ? "selected" : ""}
            onClick={() => handleRarityChange("C")}
          >
            C
          </button>
        </div>
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

export default App;
