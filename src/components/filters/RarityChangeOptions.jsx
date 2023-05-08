import React from "react";
import { filterRarityOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";
import styled from "styled-components";

const RarityButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  color: #ccc;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #6f42c1;
    border-bottom-color: #6f42c1;
  }

  &.active {
    color: #6f42c1;
    border-bottom-color: #6f42c1;
  }
`;

const RarityChangeOptions = () => {
  const { selectedRarity, setSelectedRarity } = useFilterStore();

  const renderFilterButtons = () => {
    return filterRarityOptions.map((option) => {
      return (
        <RarityButton
          key={option.value}
          className={selectedRarity === option.value ? "active" : ""}
          onClick={() => setSelectedRarity(option.value)}
        >
          {option.label}
        </RarityButton>
      );
    });
  };

  return <div>{renderFilterButtons()}</div>;
};

export default RarityChangeOptions;
