import React from "react";
import styled from "styled-components";
import Sith from "../svg/Sith";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 999;
`;

const LoaderIcon = styled(Sith)``;

const Loader = () => {
  return (
    <Wrapper>
      <LoaderIcon />
    </Wrapper>
  );
};

export default Loader;
