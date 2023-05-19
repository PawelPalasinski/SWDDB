import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../svg/Logo";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  background: rgb(174, 175, 238);
  background: radial-gradient(
    circle,
    rgba(174, 175, 238, 0) 32%,
    rgba(12, 13, 13, 1) 100%
  );
  color: #fff;
  height: 60px;
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
      display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;
      position: fixed;
      top: 0;
      left: 0;
      transition: all 0.5s ease;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 9;
    }

    .menu-icon {
      display: block;
    }

    li {
      margin: 10px 0;
    }

    body {
      overflow: ${({ isOpen }) => (isOpen ? "hidden" : "auto")};
      height: 100vh;
    }
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav isOpen={isOpen}>
      <Link to="/SWDDB">
        <Logo />
      </Link>
      <FaBars className="menu-icon" onClick={handleToggleMenu} />
      <ul>
        <li>
          <Link to="/SWDDB" onClick={handleToggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/cards" onClick={handleToggleMenu}>
            Cards
          </Link>
        </li>
        <li>
          <Link to="/test" onClick={handleToggleMenu}>
            Test
          </Link>
        </li>
        <li>
          <Link to="/collection" onClick={handleToggleMenu}>
            Personal Collection
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleToggleMenu}>
            Contact Me
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleToggleMenu}>
            About
          </Link>
        </li>
      </ul>
    </Nav>
  );
}

export default Navbar;
