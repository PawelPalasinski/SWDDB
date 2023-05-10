import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 20px;
  & ul {
    display: flex;
    width: 20%;
    & li:first-child {
      margin-right: 10px;
    }
    & a {
      color: #fff;
      text-decoration: none;
      margin-right: 10px;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>© 2023 Pawel Palasinski</div>
      <ul>
        <li>
          <a
            href="https://github.com/PawelPalasinski"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/pawe%C5%82pa%C5%82asi%C5%84ski"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
