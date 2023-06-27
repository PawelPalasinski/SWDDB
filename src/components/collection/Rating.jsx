import React, { useState, useEffect } from "react";
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
    cursor: pointer;
  }
`;

const Rating = ({ onClick, initialRate, cardCode, rate }) => {
  const [filledStars, setFilledStars] = useState(rate);

  console.log("R " + rate);
  console.log("R " + initialRate);

  useEffect(() => {
    if (rate) {
      setFilledStars(parseInt(rate));
    }
  }, [cardCode]);

  const handleStarHover = (index) => {
    setFilledStars(index + 1);
  };

  const handleStarLeave = () => {
    setFilledStars(rate);
  };

  const handleStarClick = () => {
    if (rate !== filledStars) {
      onClick(filledStars);
    }
  };

  return (
    <RatingWrapper>
      <StarList>
        {[...Array(5)].map((_, index) => (
          <li
            key={"star" + index}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
            onClick={handleStarClick}
          >
            <Star fill={index < filledStars ? "gold" : "gray"} />
          </li>
        ))}
      </StarList>
      <p>Rate: {rate}</p>
    </RatingWrapper>
  );
};

export default Rating;
