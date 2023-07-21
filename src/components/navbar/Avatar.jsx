import React from "react";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #ffd700;
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000;
  margin: 0 10px;
`;

const Avatar = ({ username }) => {
  const firstLetter = username ? username.charAt(0) : "";

  return (
    <>
      {username === null ? null : <AvatarWrapper>{firstLetter}</AvatarWrapper>}
    </>
  );
};

export default Avatar;
