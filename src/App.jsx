import { useState, useEffect } from "react";
import './App.css'

import fetchSWDDB from './js/api'

import CardList from './components/CardList'

function App() {

  const [cards, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchSWDDB();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  return (
    <>
<CardList cards={cards} />
</>
  )
}

export default App
