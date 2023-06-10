import React, { useState } from "react";
import styled from "styled-components";
import aboutText from "../js/aboutText";

const AboutPage = () => {
  const [locale, setLocale] = useState("en");
  const text = aboutText[locale];

  const changeLanguage = (lng) => {
    setLocale(lng);
  };

  const MainContainer = styled.main`
    font-family: "FuturisticFont", Arial, sans-serif;
    color: #333;
  `;
  const LanguageButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  `;
  const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: "Your Readable Font", Arial, sans-serif;
  `;

  const Paragraph = styled.p`
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
    font-family: "Your Readable Font", Arial, sans-serif;
  `;
  return (
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
  );
};

export default AboutPage;
