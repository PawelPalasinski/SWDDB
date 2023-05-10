import React from "react";
import styled, { keyframes } from "styled-components";

const changeColor = keyframes`
  0% {
    fill: black;
  }
  25% {
    fill: white;
  }
  50% {
    fill: red;
  }
  100% {
    fill: black;
  }
`;

const spinAndGrow = keyframes`
  from {
    transform: rotate(0deg) scale(0.1);
  }
  to {
    transform: rotate(360deg) scale(10);
  }
`;

const StyledSVG = styled.svg`
  fill: red;
  animation: ${changeColor} 2s linear infinite,
    ${spinAndGrow} 2s linear infinite;
`;

const Sith = ({ width = "100vw", height = "90vh" }) => {
  return (
    <StyledSVG viewBox="0 0 76 76" width={width} height={height}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillOpacity="1"
          strokeLinejoin="round"
          d="M 30.351,23.3949L 38.0169,19L 45.679,23.4244C 45.3991,23.8942 45.1188,24.364 44.8338,24.8309L 38.013,20.9065C 35.7412,22.216 33.4687,23.5251 31.1941,24.8298L 30.351,23.3949 Z M 33.2788,25.9482L 37.982,23.0164L 42.691,25.9458L 42.2196,26.6994L 39.8535,25.331C 39.6,27.7058 39.3291,30.0798 39.0822,32.4544C 40.1354,33.0708 41.1944,33.6778 42.2507,34.2898L 48.0344,30.0592L 45.6707,28.6901C 45.8087,28.4294 45.94,28.1645 46.0811,27.9054C 47.7098,28.7809 49.3427,29.6484 50.9705,30.5251L 50.7839,36.0726L 49.9052,36.0392L 49.9052,33.3032L 43.3427,36.1976L 43.3427,39.8346L 49.9048,42.7275L 49.9048,39.9911L 50.7831,39.96C 50.8475,41.8096 50.9116,43.6596 50.9689,45.5096L 46.0788,48.1261C 45.9443,47.863 45.8039,47.6029 45.6719,47.3387C 46.4612,46.8858 47.2471,46.4274 48.0348,45.9718L 42.2196,41.7106L 39.0465,43.546L 39.8539,50.7001L 42.2204,49.3321L 42.691,50.0841L 38.0169,53.0139L 33.2784,50.0833L 33.7506,49.3309L 36.1458,50.7001L 36.9194,43.5436C 36.9331,43.5062 36.8891,43.4977 36.8674,43.4819L 33.7804,41.7106L 27.9651,45.9722L 30.3294,47.3717L 29.8902,48.156C 28.269,47.2844 26.6475,46.4137 25.0295,45.5366C 25.0805,43.6875 25.1305,41.8383 25.1859,39.9891L 26.0897,40.0217L 26.0897,42.7617L 32.6574,39.8645L 32.6569,36.1976L 26.0897,33.3016L 26.0897,36.04L 25.1859,36.0726C 25.132,34.2329 25.0774,32.3923 25.031,30.5526L 29.8887,27.9062L 30.3294,28.6901L 27.9644,30.0592L 33.7187,34.2895C 34.7848,33.6775 35.8544,33.0708 36.9174,32.4544C 36.6705,30.0798 36.3997,27.7058 36.1461,25.331L 33.7501,26.699C 33.5897,26.4505 33.4361,26.1982 33.2788,25.9482 Z M 21.5461,28.4939C 24.0993,27.0241 26.6506,25.5504 29.2007,24.075C 29.4893,24.5401 29.7676,25.0122 30.0455,25.4835L 23.1948,29.4385L 23.194,37.3156L 21.5438,37.316C 21.5454,34.3752 21.5411,31.4343 21.5461,28.4939 Z M 45.9829,25.5137L 46.8257,24.0753C 49.3698,25.5464 51.9089,27.0253 54.4538,28.4939C 54.459,31.4343 54.4547,34.3752 54.4563,37.316L 52.8059,37.3156L 52.8052,29.4385L 45.9829,25.5137 Z M 21.5438,38.653L 23.1944,38.653L 23.1944,46.5233C 25.5385,47.898 28.0139,49.3129 30.0475,50.4855L 29.2066,51.923C 26.6502,50.456 24.1017,48.974 21.5457,47.5053C 21.5414,44.5546 21.5446,41.604 21.5438,38.653 Z M 52.8055,38.653L 54.4559,38.653C 54.4551,41.604 54.459,44.555 54.4539,47.5057C 51.9089,48.9747 49.3699,50.4537 46.8257,51.9246L 45.9829,50.4863C 48.2554,49.1638 50.5381,47.8532 52.804,46.5233L 52.8055,38.653 Z M 30.3513,52.5757L 31.1953,51.1377L 38.013,55.093L 44.8349,51.1377L 45.679,52.5757L 38.0169,57L 30.3513,52.5757 Z "
        ></path>{" "}
      </g>
    </StyledSVG>
  );
};

export default Sith;
