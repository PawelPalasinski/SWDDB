import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import PersonalCollection from "./pages/PersonalCollection";
import About from "./pages/About";
import Test from "./pages/Test";
import Statistics from "./components/statistics/Statistics";

import Loader from "./components/loader/Loader";

import useCardStore from "./store/cardStore";

function App() {
  const { isLoading, fetchData } = useCardStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/collection" element={<PersonalCollection />} />
        <Route path="/test" element={<Test />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
