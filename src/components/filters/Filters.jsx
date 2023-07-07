import React from "react";
import styled from "styled-components";

import FactionChangeOptions from "./FactionChangeOptions";
import RarityChangeOptions from "./RarityChangeOptions";
import ExpansionChangeOptions from "./ExpansionChangeOptions";
import Statistics from "../statistics/Statistics";

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  flex-direction: column;
  position: relative;
  padding-top: 80px;
`;

const StatisticsContainer = styled.div`
  position: absolute;
  z-index: -1;
  padding-top: 40px;
`;

const Filters = () => {
  return (
    <FiltersContainer>
      <FactionChangeOptions />
      <RarityChangeOptions />
      <ExpansionChangeOptions />
      <StatisticsContainer>
        <Statistics />
      </StatisticsContainer>
    </FiltersContainer>
  );
};

export default Filters;
