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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = () => {
    // Logika logowania użytkownika
  };

  const handleLogout = () => {
    // Logika wylogowywania użytkownika
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar isLoggedIn={userLoggedIn} onLogout={handleLogout} />
        {errorMessage && <p>{errorMessage}</p>}
        <Routes>
          <Route path="/SWDDB/" element={<HomePage />} />
          <Route path="/SWDDB/cards" element={<CardsPage />} />
          <Route
            path="/SWDDB/collection"
            element={userLoggedIn ? <PersonalCollectionPage /> : <LoginPage />}
          />
          <Route path="/SWDDB/about" element={<AboutPage />} />
          <Route path="/SWDDB/contact" element={<ContactPage />} />
          <Route
            path="/SWDDB/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route path="/SWDDB/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
