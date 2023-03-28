




import React, { useState, useEffect } from 'react';
import "./App.css";
import AllCards from './components/AllCards';
import fetchSWDDB from "./js/api";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AllCards dataPerPage={10} data={data} />
    </div>
  );
}

export default App;
