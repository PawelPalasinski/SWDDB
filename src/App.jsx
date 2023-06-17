import React, { useEffect, useState } from "react";
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
import useUserStore from "./store/userStore";

import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DeathStar';
    src: url(${SWFont});
  }

  body {
    font-family: 'DeathStar', sans-serif;
    margin: 0;
    padding: 0;
    overflow: auto;
    scrollbar-width: thin;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0.1em;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  button {
    font-family: 'DeathStar', sans-serif;
  }
`;

function App() {
  const { isLoading, fetchData } = useCardStore();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

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
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/SWDDB/" element={<HomePage />} />
          <Route path="/SWDDB/cards" element={<CardsPage />} />
          <Route
            path="/SWDDB/card-collection"
            element={isLoggedIn ? <PersonalCollectionPage /> : <LoginPage />}
          />
          <Route path="/SWDDB/about" element={<AboutPage />} />
          <Route path="/SWDDB/contact" element={<ContactPage />} />
          <Route path="/SWDDB/login" element={<LoginPage />} />
          <Route path="/SWDDB/test" element={<TestPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
