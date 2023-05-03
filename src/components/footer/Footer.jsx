import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>© 2023 Pawel Palasinski</div>
      <ul>
        <li>Github</li>
        <li>LinkedIn</li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
