import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../svg/Logo";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2d2d2d;
  color: #fff;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
  }

  li {
    margin: 0 10px;

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .menu-icon {
    display: none;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    ul {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 80px;
      left: 0;
      transition: all 0.5s ease;
      background-color: #2d2d2d;
      z-index: 9999;
    }

    .menu-icon {
      display: block;
    }

    li {
      margin: 10px 0;
    }

    ul.open {
      display: flex;
    }
  }

  @media screen and (max-width: 768px) {
    body {
      overflow: ${({ isOpen }) => (isOpen ? "hidden" : "auto")};
    }
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <Logo />
      <FaBars className="menu-icon" onClick={handleToggleMenu} />
      <ul className={isOpen ? "open" : ""}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cards">Cards</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/collection">Personal Collection</Link>
        </li>
        <li>
          <Link to="/contact">Contact Me</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </Nav>
  );
}

export default Navbar;
