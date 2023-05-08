import React, { useRef } from "react";
import { filterExpansionOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";
import styled from "styled-components";

const ExpansionOptionsContainer = styled.div`
  h3 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: bold;
  }

  label {
    display: block;
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: normal;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + span {
    color: red;
  }
`;

const ExpansionChangeOptions = () => {
  const { selectedExpansion, setSelectedExpansion } = useFilterStore();

  const expansionRef = useRef(null);

  const handleExpansionChange = () => {
    const selectedExpansions = Array.from(
      expansionRef.current.querySelectorAll("input:checked")
    ).map((input) => input.value);
    setSelectedExpansion(selectedExpansions);
  };

  return (
    <ExpansionOptionsContainer
      ref={expansionRef}
      onChange={handleExpansionChange}
    >
      <h3>Expansion</h3>
      {filterExpansionOptions.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            defaultChecked={selectedExpansion.includes(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </ExpansionOptionsContainer>
  );
};

export default ExpansionChangeOptions;
