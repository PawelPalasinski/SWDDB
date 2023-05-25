import React from "react";
import { filterRarityOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";
import styled from "styled-components";

const RarityButton = styled.button`
  width: 100px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 5px;
  background-color: ${({ active }) => (active ? "#ffd700" : "#f8f9fa")};
  color: ${({ active }) => (active ? "#000" : "#fff")};
  border: ${({ active }) => (active ? "none" : "1px solid #ced4da")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-shadow: 1px 1px 2px #fff, 0 0 1em black, 0 0 0.2em #000;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: #ffd700;
    color: #000;
  }
`;

const RarityChangeOptions = () => {
  const { selectedRarity, setSelectedRarity } = useFilterStore();

  const renderFilterButtons = () => {
    return filterRarityOptions.map((option) => {
      const active = selectedRarity === option.value;
      return (
        <RarityButton
          key={option.value}
          active={active}
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
