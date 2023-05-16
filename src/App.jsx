import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createGlobalStyle } from "styled-components";
import SWFont from "./assets/fonts/DeathStar-VmWB.ttf";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import PersonalCollection from "./pages/PersonalCollection";
import About from "./pages/About";
import Test from "./pages/Test";
import Contact from "./pages/Contact";

import Footer from "./components/footer/Footer";
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
          <Route path="/SWDDB/" element={<Home />} />
          <Route path="/SWDDB/cards" element={<Cards />} />
          <Route path="/SWDDB/collection" element={<PersonalCollection />} />
          <Route path="/SWDDB/test" element={<Test />} />
          <Route path="/SWDDB/about" element={<About />} />
          <Route path="/SWDDB/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
