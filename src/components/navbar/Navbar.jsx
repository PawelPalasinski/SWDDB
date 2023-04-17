import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../svg/Logo";

function Navbar() {
  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cards">Cards</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
