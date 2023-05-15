import React from "react";
import styled from "styled-components";

import backgroundImage from "../assets/images/deathstarwallpaper.jpg";
import layer from "../assets/images/layer1.png";
import logo from "../assets/images/logo.png";

const ParallaxContainer = styled.div`
  position: relative;
  height: 400px; /* Ustaw wysokość, która pasuje do Twoich potrzeb */
  overflow: hidden;
`;

const ParallaxText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
`;

const ParallaxImage = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  opacity: 0.5; /* Ustaw poziom przezroczystości, który Ci odpowiada */
  z-index: -1;
`;

function Home() {
  return (
    <ParallaxContainer>
      <ParallaxText>
        <p>Welcome to the Star Wars Destiny card collection app</p>
      </ParallaxText>
      <ParallaxImage />
    </ParallaxContainer>
  );
}

export default Home;
