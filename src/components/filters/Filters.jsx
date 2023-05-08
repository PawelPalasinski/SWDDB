import React from "react";
import styled from "styled-components";

import FactionChangeOptions from "./FactionChangeOptions";
import RarityChangeOptions from "./RarityChangeOptions";
import ExpansionChangeOptions from "./ExpansionChangeOptions";

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

const Filters = () => {
  return (
    <FiltersContainer>
      <FactionChangeOptions />
      <RarityChangeOptions />
      <ExpansionChangeOptions />
    </FiltersContainer>
  );
};

export default Filters;
