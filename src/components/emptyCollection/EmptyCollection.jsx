import { Link } from "react-router-dom";
import styled from "styled-components";

import deathstarpng from "../../assets/images/deathstarpng.png";
import spaceWebp from "../../assets/images/space.webp";
import cardsImage from "../../assets/images/cards.png";

const StyledNotFound = styled.div`
background-image: url(${spaceWebp});
background-size: cover;
background-position: center;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: -60px;

& img {
    width: 200px;
    margin: 0 20px;
}

  & h1 {
    color: whitesmoke;
    font-size: 3.5rem;
    margin: 0 auto;
    text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
    white-space: wrap;
    text-align: center;
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;

    @media (max-width: 30rem) {
      font-size: 2.5rem;
    }

    & > span {
      animation: spooky 2s alternate infinite linear;
      color: red;
      display: inline-block;
      & img {
        width: 80px;
        margin: 0 20px;
      }
    }
  }

  & h2 {
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0.4em;
  }

  & p {
    color: #ccc;
    margin-top: 0;
    text-align: center;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
  }
}

@keyframes spooky {
  from {
    transform: translateY(0.15em) scaleY(0.95);
  }

  to {
    transform: translateY(-0.15em);
  }
}
`;

const StyledLink = styled.a`
  color: #ffd700;
  text-decoration: none;
`;

const EmptyCollection = () => {
  return (
    <StyledNotFound>
      <img src={cardsImage} alt="Cards and dice" />
      <h1>
        N
        <span>
          <img src={deathstarpng} alt="Death Star" />
        </span>
        cards added to collection found
      </h1>
      <p>
        Start adding
        <StyledLink as={Link} to="/SWDDB/cards">
          {" "}
          cards{" "}
        </StyledLink>
        to your collection
      </p>
    </StyledNotFound>
  );
};

export default EmptyCollection;
