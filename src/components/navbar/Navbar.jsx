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
`;

function Navbar() {
  return (
    <Nav>
      <Logo />
      <ul>
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
          <Link to="/about">About</Link>
        </li>
      </ul>
    </Nav>
  );
}

export default Navbar;
