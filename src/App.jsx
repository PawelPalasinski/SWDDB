import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createGlobalStyle } from "styled-components";
import SWFont from "./assets/fonts/Starjedi.ttf";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
import PersonalCollectionPage from "./pages/PersonalCollectionPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import NotFound from "./pages/NotFound";
import Loader from "./components/loader/Loader";

import useCardStore from "./store/cardStore";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'DeathStar';
  src: url(${SWFont});
}

body {
  font-family: 'DeathStar', sans-serif;
  margin: 0;
  padding: 0;
}

button {
  font-family: 'DeathStar', sans-serif;
}
`;

function App() {
  const { isLoading, fetchData } = useCardStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/SWDDB/" element={<HomePage />} />
          <Route path="/SWDDB/cards" element={<CardsPage />} />
          <Route
            path="/SWDDB/collection"
            element={<PersonalCollectionPage />}
          />
          <Route path="/SWDDB/about" element={<AboutPage />} />
          <Route path="/SWDDB/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
