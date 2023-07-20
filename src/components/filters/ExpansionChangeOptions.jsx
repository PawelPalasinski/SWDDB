import React, { useRef } from "react";
import styled from "styled-components";

import useCardCountStore from "../../store/cardCountStore";
import useFilterStore from "../../store/filterStore";

import { filterExpansionOptions } from "../../js/options";

const ExpansionOptionsContainer = styled.div`
  h3 {
    color: #ffd700;
    margin: 0 auto;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #fff;
    cursor: pointer;
    text-align: center;
    text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;

    &:hover {
      color: #ffd700;
    }
  }

  span {
    font-size: 12px;
  }

  input[type="checkbox"] {
    display: none;
    color: #000;
  }

  input[type="checkbox"]:checked + span {
    color: #ffd700;
  }
`;

const ExpansionChangeOptions = () => {
  const { selectedExpansion, setSelectedExpansion } = useFilterStore();

  const cardAWCount = useCardCountStore((state) => state.cardAWCount);
  const cardSoRCount = useCardCountStore((state) => state.cardSoRCount);
  const cardEaWCount = useCardCountStore((state) => state.cardEaWCount);
  const cardTPGCount = useCardCountStore((state) => state.cardTPGCount);
  const cardLEGCount = useCardCountStore((state) => state.cardLEGCount);
  const cardRIVCount = useCardCountStore((state) => state.cardRIVCount);
  const cardWotFCount = useCardCountStore((state) => state.cardWotFCount);
  const cardAtGCount = useCardCountStore((state) => state.cardAtGCount);
  const cardCONVCount = useCardCountStore((state) => state.cardCONVCount);
  const cardAoNCount = useCardCountStore((state) => state.cardAoNCount);
  const cardSoHCount = useCardCountStore((state) => state.cardSoHCount);
  const cardCMCount = useCardCountStore((state) => state.cardCMCount);
  const cardTRCount = useCardCountStore((state) => state.cardTRCount);

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
      {filterExpansionOptions.map((option) => {
        let count;

        if (option.value === "AW") {
          count = cardAWCount;
        } else if (option.value === "Sor") {
          count = cardSoRCount;
        } else if (option.value === "EaW") {
          count = cardEaWCount;
        } else if (option.value === "TPG") {
          count = cardTPGCount;
        } else if (option.value === "LEG") {
          count = cardLEGCount;
        } else if (option.value === "RIV") {
          count = cardRIVCount;
        } else if (option.value === "WotF") {
          count = cardWotFCount;
        } else if (option.value === "AtG") {
          count = cardAtGCount;
        } else if (option.value === "CONV") {
          count = cardCONVCount;
        } else if (option.value === "AoN") {
          count = cardAoNCount;
        } else if (option.value === "SoH") {
          count = cardSoHCount;
        } else if (option.value === "CM") {
          count = cardCMCount;
        } else if (option.value === "TR") {
          count = cardTRCount;
        }

        return (
          <label key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              defaultChecked={selectedExpansion.includes(option.value)}
            />
            <span>
              {option.label} / {count}
            </span>
          </label>
        );
      })}
    </ExpansionOptionsContainer>
  );
};

export default ExpansionChangeOptions;
