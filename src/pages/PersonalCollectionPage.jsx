import React from "react";
import styled from "styled-components";

import PersonalCollection from "../components/collection/PersonalCollection";
import useUserStore from "../store/userStore";

import EmptyCollection from "../components/emptyCollection/EmptyCollection";

import space from "../assets/images/space.webp";

const PersonalCollectionPage = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const collection = isLoggedIn ? loggedInUser?.collection : [];

  const isEmpty = collection.length === 0;

  const Wrapper = styled.div`
    background-image: url(${space});
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    margin-top: -60px;
  `;

  return (
    <>
      {!!isEmpty ? (
        <EmptyCollection />
      ) : (
        <Wrapper>
          <PersonalCollection />
        </Wrapper>
      )}
    </>
  );
};

export default PersonalCollectionPage;
