import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import backgroundImage from "../assets/images/deathstarwallpaper.jpg";
import layerImage from "../assets/images/layer1.png";
import logoImage from "../assets/images/logo.png";
import tieFightersImage from "../assets/images/tieFighters.png";

import Footer from "../components/footer/Footer";

const ParallaxContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: -1;
  position: fixed;
  overflow: hidden;
  margin: 0 auto;
  margin-top: -60px;
`;

const ParallaxText = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;
  font-size: 1.5em;
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
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
  opacity: 0.5;
`;

const ParallaxTieFighters = styled.img`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
  width: 20%;
  min-width: 100px;
`;

const StyledFooter = styled.footer`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 110%;
`;

const HomePage = () => {
  const containerRef = useRef(null);
  const layerRef = useRef(null);
  const logoRef = useRef(null);
  const tieFightersRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    const logo = logoRef.current;
    const tieFighters = tieFightersRef.current;

    const handleMouseMove = (e) => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const mouseX = e.clientX - container.offsetLeft;
      const mouseY = e.clientY - container.offsetTop;

      const offsetX = 0.1 - mouseX / containerWidth;
      const offsetY = 0.1 - mouseY / containerHeight;

      const layerParallaxAmount = 40;
      const logoParallaxAmount = 20;
      const tieFightersParallaxAmount = 120;

      layer.style.transform = `translate(${offsetX * layerParallaxAmount}px, ${
        offsetY * layerParallaxAmount
      }px)`;
      logo.style.transform = `translate(${offsetX * logoParallaxAmount}px, ${
        offsetY * logoParallaxAmount
      }px)`;
      tieFighters.style.transform = `translate(${
        offsetX * tieFightersParallaxAmount
      }px, ${offsetY * tieFightersParallaxAmount}px)`;
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
      <ParallaxTieFighters
        ref={tieFightersRef}
        src={tieFightersImage}
        alt="Tie Fighters"
      />
      <StyledFooter>
        <Footer />
      </StyledFooter>
    </ParallaxContainer>
  );
};

export default HomePage;
