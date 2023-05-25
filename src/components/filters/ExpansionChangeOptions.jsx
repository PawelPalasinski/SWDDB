import React, { useRef } from "react";
import { filterExpansionOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";
import styled from "styled-components";

const ExpansionOptionsContainer = styled.div`
  h3 {
    color: #ffd700;
    margin: 10px 5px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 2px #000, 0 0 1em blue, 0 0 0.2em #000;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #000;
    cursor: pointer;
    text-align: center;
    text-shadow: 1px 1px 2px #fff, 0 0 1em blue, 0 0 0.2em #000;
  }

  span {
    text-decoration: underline;
  }

  input[type="checkbox"] {
    display: none;
    color: #000;
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
