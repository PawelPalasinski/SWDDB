import styled from "styled-components";

import deathstarpng from "../assets/images/deathstarpng.png";
import spaceWebp from "../assets/images/space.webp";

export const StyledNotFound = styled.div`
background-image: url(${spaceWebp});
background-size: cover;
background-position: center;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

  & h1 {
    color: whitesmoke;
    font-size: 12.5rem;
    margin: 0.025em 0;
    text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
    white-space: nowrap;

    @media (max-width: 30rem) {
      font-size: 8.5rem;
    }

    & > span {
      animation: spooky 2s alternate infinite linear;
      color: red;
      display: inline-block;
      & img {
        width: 120px;
        margin: 0 10px;
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

const NotFound = () => {
  return (
    <StyledNotFound>
      <h1>
        4
        <span>
          <img src={deathstarpng} alt="Death Star" />
        </span>
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
    </StyledNotFound>
  );
};

export default NotFound;
