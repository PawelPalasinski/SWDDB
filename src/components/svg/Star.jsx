import React from "react";
import styled from "styled-components";

const SvgContainer = styled.svg`
  width: 20px;
  height: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 1));
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StarPath = styled.path`
  fill: ${({ fill }) => fill};
`;

const Star = ({ fill }) => {
  return (
    <SvgContainer
      viewBox="0 0 1024 1024"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <StarPath
          d="M541.44 103.68l126.72 256 282.88 42.24-204.8 198.4L794.88 883.2 541.44 750.08 288 883.2l48.64-282.88-204.8-198.4 282.88-42.24z"
          fill={fill}
        ></StarPath>
        <StarPath
          d="M794.88 896c-2.56 0-3.84 0-6.4-1.28L541.44 764.16 294.4 894.72c-3.84 2.56-8.96 1.28-14.08-1.28-3.84-2.56-6.4-7.68-5.12-12.8l47.36-275.2L122.88 410.88c-3.84-3.84-5.12-8.96-3.84-12.8s5.12-7.68 10.24-8.96l276.48-39.68 124.16-250.88c3.84-8.96 19.2-8.96 23.04 0l124.16 250.88 276.48 39.68c5.12 1.28 8.96 3.84 10.24 8.96 1.28 5.12 0 10.24-3.84 12.8L760.32 605.44l47.36 275.2c1.28 5.12-1.28 10.24-5.12 12.8-2.56 1.28-5.12 2.56-7.68 2.56zM541.44 737.28c2.56 0 3.84 0 6.4 1.28l230.4 121.6-43.52-256c-1.28-3.84 1.28-8.96 3.84-11.52l185.6-181.76-257.28-37.12c-3.84 0-7.68-3.84-10.24-6.4l-115.2-232.96-115.2 232.96c-1.28 3.84-5.12 6.4-10.24 6.4l-257.28 37.12L345.6 591.36c2.56 2.56 3.84 7.68 3.84 11.52l-43.52 256 230.4-121.6h5.12z"
          fill="#000000"
        ></StarPath>
      </g>
    </SvgContainer>
  );
};

export default Star;
