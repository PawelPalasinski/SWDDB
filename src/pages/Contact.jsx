import React from "react";
import styled from "styled-components";
import ContactForm from "../components/contactForm/ContactForm";

import deathstarwallpaper from "../assets/images/deathstarwallpaper.jpg";

const Wrapper = styled.div`
  background-image: url(${deathstarwallpaper});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  margin: 0 auto;
  padding: 30px;
  position: relative;
`;

const Contact = () => {
  return (
    <Wrapper>
      <ContactForm />
    </Wrapper>
  );
};

export default Contact;
