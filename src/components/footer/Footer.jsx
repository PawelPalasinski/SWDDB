import React from "react";
import styled from "styled-components";

import { LinkedIn } from "../svg/LinkedIn";
import { GitHub } from "../svg/GitHub";

const StyledFooter = styled.footer`
  background: rgb(174, 175, 238);
  background: radial-gradient(
    circle,
    rgba(174, 175, 238, 0) 32%,
    rgba(12, 13, 13, 1) 100%
  );
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  text-shadow: 1px 1px 2px #000, 0 0 1em #FFD700, 0 0 0.2em #000;
  & p {
    font-size: 18px;
  }

  & ul{
    
    margin-right: 5%;
    li {
    margin-rught: 10px;
  }
}

  @media (max-width: 768px) {
    & p {
      font-size: 8px;
    }
  }

  & ul {
    display: flex;
    & li:first-child {
      margin-right: 10px;
    }
    & a {
      color: #fff;
      text-decoration: none;
      margin-right: 10px;
      display: flex;
      align-items: center;
      width: 25px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>© 2023 Pawel Palasinski</p>
      <ul>
        <li>
          <a
            href="https://github.com/PawelPalasinski"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/pawe%C5%82pa%C5%82asi%C5%84ski"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </a>
        </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
