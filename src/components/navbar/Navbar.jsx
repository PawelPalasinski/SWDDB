import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Logo from "../svg/Logo";
import useAuthStore from "../../store/authStore";

const slideIn = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

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
  color: #ffd700;
  height: 60px;
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;

  .menu-icon {
    display: none;
    cursor: pointer;
  }

  .close-icon {
    display: none;
    width: 0;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
  }

  li {
    margin: 0 10px;

    a {
      color: #ffd700;
      text-decoration: none;
      position: relative;
      overflow: hidden;

      &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #ffd700;
        transform-origin: left;
        transition: width 0.3s ease-in-out;
      }

      &:hover:after {
        width: 100%;
        animation: ${slideIn} 0.5s ease-in-out;
      }

      &:hover {
        text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
      }

      &.active {
        color: #fff;
        text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em;

        &:after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #ffd700;
          transform-origin: left;
          transition: width 0.3s ease-in-out;
        }

        &:hover:after {
          width: 100%;
          animation: ${slideIn} 0.5s ease-in-out;
        }
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
      padding: 0;
    }

    .menu-icon {
      display: block;
    }

    .close-icon {
      display: block;
      position: absolute;
      top: 10vh;
      right: 10vw;
      color: #fff;
      font-size: 1.5rem;
      width: auto;
    }

    li {
      margin: 10px 0;
      text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
    }

    body {
      overflow: ${({ isOpen }) => (isOpen ? "hidden" : "auto")};
      height: 100vh;
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/SWDDB/login");
  };

  const handleToggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Nav isOpen={isOpen}>
      <Link to="/SWDDB/">
        <Logo />
      </Link>
      <FaBars className="menu-icon" onClick={handleToggleMenu} />
      <ul>
        <li>
          <FaTimes
            className="close-icon"
            onClick={handleToggleMenu}
            style={{ display: isOpen ? "block" : "none" }}
          />
        </li>

        <li>
          <NavLink exact="true" to="/SWDDB/" onClick={handleToggleMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/SWDDB/cards" onClick={handleToggleMenu}>
            Cards
          </NavLink>
        </li>

        {isLoggedIn && (
          <li>
            <NavLink
              to="/SWDDB/collection"
              exact="true"
              onClick={handleToggleMenu}
            >
              Collection
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/SWDDB/contact" onClick={handleToggleMenu}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/SWDDB/about" onClick={handleToggleMenu}>
            About
          </NavLink>
        </li>

        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/SWDDB/login" onClick={handleToggleMenu}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/SWDDB/register" onClick={handleToggleMenu}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </Nav>
  );
};

export default Navbar;
