import React, { useState, useEffect } from "react";
import "./App.css";
import AllCards from "./components/AllCards";
import fetchSWDDB from "./js/api";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFaction, setSelectedFaction] = useState('all');

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

  const handleFactionChange = (event) => {
    setSelectedFaction(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select value={selectedFaction} onChange={handleFactionChange}>
        <option value="all">All Factions</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="gray">Gray</option>
      </select>
      <AllCards dataPerPage={20} data={data} selectedFaction={selectedFaction} />
    </div>
  );
}

export default App;
