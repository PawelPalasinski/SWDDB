import React from "react";
import styled from "styled-components";
import ContactForm from "../components/contactForm/ContactForm";

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
`;

const StyledFooter = styled.footer`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
`;

const Contact = () => {
  return (
    <>
      <Wrapper>
        <ContactForm />
        <StyledFooter>
          <Footer />
        </StyledFooter>
      </Wrapper>
    </>
  );
};

export default Contact;
