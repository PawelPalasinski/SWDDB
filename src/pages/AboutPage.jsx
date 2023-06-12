import React, { useState } from "react";
import styled from "styled-components";
import aboutText from "../js/aboutText";

import deathstarwallpaper from "../assets/images/deathstarwallpaper.jpg";
import Footer from "../components/footer/Footer";

const Wrapper = styled.div`
  background-image: url(${deathstarwallpaper});
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
  flex-direction: column;
  text-align: center;
  font-weight: 400;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: auto;
  @import url("https://fonts.googleapis.com/css2?family=Michroma&display=swap");
  font-family: "Michroma", sans-serif;
`;

const LanguageButtons = styled.div`
  display: flex;
  column-gap: 10px;
  & button {
    background-color: #ffd700;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 2em;
    padding: 12px;
    width: 100px;
    border: none;
    text-shadow: 1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000;

    &:hover {
      background-color: #fff;
      color: #ffd700;
    }
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "Megrim", cursive;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const StyledFooter = styled.footer`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
`;

const AboutPage = () => {
  const [locale, setLocale] = useState("en");
  const text = aboutText[locale];

  const changeLanguage = (lng) => {
    setLocale(lng);
  };

  return (
    <Wrapper>
      <MainContainer>
        <LanguageButtons>
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("pl")}>Polski</button>
        </LanguageButtons>
        <Title>{text.about.title}</Title>
        <section>
          <article>
            <Paragraph>{text.about.paragraph1}</Paragraph>
          </article>
          <article>
            <Paragraph>{text.about.paragraph2}</Paragraph>
          </article>
        </section>
      </MainContainer>
      <StyledFooter>
        <Footer />
      </StyledFooter>
    </Wrapper>
  );
};

export default AboutPage;
