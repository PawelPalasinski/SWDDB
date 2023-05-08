import React from "react";
import { filterFactionOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";
import styled from "styled-components";

const FactionButton = styled.button`
  width: 100px;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  background-color: ${({ active }) => (active ? "#007bff" : "#f8f9fa")};
  color: ${({ active }) => (active ? "#fff" : "#495057")};
  border: ${({ active }) => (active ? "none" : "1px solid #ced4da")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const FactionChangeOptions = () => {
  const { selectedFaction, setSelectedFaction } = useFilterStore();

  const renderFilterButtons = () => {
    return filterFactionOptions.map((option) => {
      const active = selectedFaction === option.value;
      return (
        <FactionButton
          key={option.value}
          active={active}
          onClick={() => setSelectedFaction(option.value)}
        >
          {option.label}
        </FactionButton>
      );
    });
  };

  return <div>{renderFilterButtons()}</div>;
};

export default FactionChangeOptions;
