import React from "react";
import styled from "styled-components";

import useFilterStore from "../../store/filterStore";
import useCardCountStore from "../../store/cardCountStore";

import { filterFactionOptions } from "../../js/options";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`;

const FactionButton = styled.button`
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

const FactionChangeOptions = () => {
  const { selectedFaction, setSelectedFaction } = useFilterStore();

  const cardRedCount = useCardCountStore((state) => state.cardRedCount);
  const cardYellowCount = useCardCountStore((state) => state.cardYellowCount);
  const cardBlueCount = useCardCountStore((state) => state.cardBlueCount);
  const cardGrayCount = useCardCountStore((state) => state.cardGrayCount);

  const renderFilterButtons = () => {
    return filterFactionOptions.map((option) => {
      const active = selectedFaction === option.value;

      let count;

      if (option.value === "red") {
        count = cardRedCount;
      } else if (option.value === "yellow") {
        count = cardYellowCount;
      } else if (option.value === "blue") {
        count = cardBlueCount;
      } else if (option.value === "gray") {
        count = cardGrayCount;
      }

      return (
        <FactionButton
          key={option.value}
          active={active}
          onClick={() => setSelectedFaction(option.value)}
        >
          {option.label} {count}
        </FactionButton>
      );
    });
  };

  return <Wrapper>{renderFilterButtons()}</Wrapper>;
};

export default FactionChangeOptions;
