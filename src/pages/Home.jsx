import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import backgroundImage from "../assets/images/deathstarwallpaper.jpg";
import layerImage from "../assets/images/layer1.png";
import logoImage from "../assets/images/logo.png";

const ParallaxContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ParallaxText = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;
`;

const ParallaxLayer = styled.div`
  position: absolute;
  bottom: 50px;
  left: -10px;
  z-index: 1;
  pointer-events: none;
  width: 120%;
  height: 100%;
  background-image: url(${layerImage});
  background-size: cover;
  background-position: center;
`;

const ParallaxLogo = styled.img`
  position: absolute;
  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
  width: 20%;
  min-width: 100px;
  filter: invert(100%);
`;

function Home() {
  const containerRef = useRef(null);
  const layerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    const logo = logoRef.current;

    const handleMouseMove = (e) => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const mouseX = e.clientX - container.offsetLeft;
      const mouseY = e.clientY - container.offsetTop;

      const offsetX = 0.1 - mouseX / containerWidth;
      const offsetY = 0.1 - mouseY / containerHeight;

      const layerParallaxAmount = 40;
      const logoParallaxAmount = 20;

      layer.style.transform = `translate(${offsetX * layerParallaxAmount}px, ${
        offsetY * layerParallaxAmount
      }px)`;
      logo.style.transform = `translate(${offsetX * logoParallaxAmount}px, ${
        offsetY * logoParallaxAmount
      }px)`;
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <ParallaxContainer ref={containerRef}>
      <ParallaxText>
        <p>Welcome to the Star Wars Destiny card collection app</p>
      </ParallaxText>
      <ParallaxLayer ref={layerRef} alt="Layer" />
      <ParallaxLogo ref={logoRef} src={logoImage} alt="Logo" />
    </ParallaxContainer>
  );
}

export default Home;
