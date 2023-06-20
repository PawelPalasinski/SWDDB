import React, { useState } from "react";
import styled from "styled-components";

import Star from "../svg/Star";

const RatingWrapper = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(230, 230, 230, 0.2),
    transparent
  );
  padding: 2px;
  border-radius: 8px;
  margin: 10px 0;
`;

const StarList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin: 0;
  & li {
    background-color: transparent;
    margin: 2px;
  }
`;

const Rating = () => {
  const [filledStars, setFilledStars] = useState(0);

  const handleStarHover = (index) => {
    setFilledStars(index + 1);
  };

  const handleStarLeave = () => {
    setFilledStars(0);
  };

  return (
    <RatingWrapper>
      <StarList>
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
          >
            <Star fill={index < filledStars ? "gold" : "gray"} />
          </li>
        ))}
      </StarList>
    </RatingWrapper>
  );
};

export default Rating;
