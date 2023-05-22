import React from "react";
import styled from "styled-components";

const SvgContainer = styled.svg`
  fill: #ffd700;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 255, 0.25));
  transition: transform 0.2s ease-in-out;
  width: 40px;
  height: 40px;
  &:hover {
    transform: scale(1.1);
    fill: #f00;
  }
`;

export const LinkedIn = () => {
  return (
    <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </SvgContainer>
  );
};
