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
import Footer from "./components/footer/Footer";
import NotFound from "./components/notFound/NotFound";
import Loader from "./components/loader/Loader";

import ContactForm from "./components/contactForm/ContactForm";

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
  overflow: hidden;
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
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/collection" element={<PersonalCollection />} />
          <Route path="/test" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
