import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PersonalCollection from "../components/collection/PersonalCollection";
import EmptyCollection from "../components/emptyCollection/EmptyCollection";
import Footer from "../components/footer/Footer";

import useUserStore from "../store/userStore";

import space from "../assets/images/space.webp";

const Wrapper = styled.div`
  background-image: url(${space});
  background-repeat: no-repeat;
  background-size: cover;
  inset: 0;
  display: flex;
  justify-content: center;
  z-index: -1;
  margin-top: -60px;
  overflow: auto;
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const PersonalCollectionPage = () => {
  const [refresh, setRefresh] = useState(false);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const loggedInUser = useUserStore((state) => state.loggedInUser);

  const handleAddOrRemoveFromCollection = useUserStore(
    (state) => state.handleAddOrRemoveFromCollection
  );

  const collection = isLoggedIn ? loggedInUser?.collection : [];

  const isEmpty = collection === null;

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <>
      {!!isEmpty ? (
        <EmptyCollection />
      ) : (
        <Wrapper>
          <PersonalCollection collection={collection} />
        </Wrapper>
      )}

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </>
  );
};

export default PersonalCollectionPage;
