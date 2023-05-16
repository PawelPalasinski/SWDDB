import React from "react";
import styled from "styled-components";
import ContactForm from "../components/contactForm/ContactForm";

import deathstarwallpaper from "../assets/images/deathstarwallpaper.jpg";

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
`;

const Contact = () => {
  return (
    <Wrapper>
      <ContactForm />
    </Wrapper>
  );
};

export default Contact;
