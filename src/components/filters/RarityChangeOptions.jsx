import React from "react";
import styled from "styled-components";

import useCardCountStore from "../../store/cardCountStore";
import useFilterStore from "../../store/filterStore";

import { filterRarityOptions } from "../../js/options";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RarityButton = styled.button`
  width: 140px;
  border-radius: 10px;
  margin: 10px 5px;
  background-color: ${({ active }) => (active ? "#ffd700" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#ffd700")};
  border: ${({ active }) => (active ? "none" : "1px solid #ffd700")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.6);
  height: 25px;
  &:hover {
    background-color: #ffd700;
    color: #fff;
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
  }
`;
const RarityChangeOptions = () => {
  const { selectedRarity, setSelectedRarity } = useFilterStore();

  const cardLCount = useCardCountStore((state) => state.cardLCount);
  const cardRCount = useCardCountStore((state) => state.cardRCount);
  const cardUCount = useCardCountStore((state) => state.cardUCount);
  const cardCCount = useCardCountStore((state) => state.cardCCount);

  const renderFilterButtons = () => {
    return filterRarityOptions.map((option) => {
      const active = selectedRarity === option.value;
      let count;

      if (option.value === "L") {
        count = cardLCount;
      } else if (option.value === "R") {
        count = cardRCount;
      } else if (option.value === "U") {
        count = cardUCount;
      } else if (option.value === "C") {
        count = cardCCount;
      }

      return (
        <RarityButton
          key={option.value}
          active={active}
          onClick={() => setSelectedRarity(option.value)}
        >
          {option.label} {count}
        </RarityButton>
      );
    });
  };

  return <Wrapper>{renderFilterButtons()}</Wrapper>;
};

export default RarityChangeOptions;
