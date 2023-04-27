import React, { useRef } from "react";
import { filterExpansionOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";

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
    <div ref={expansionRef} onChange={handleExpansionChange}>
      <h3>Expansion</h3>
      {filterExpansionOptions.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            defaultChecked={selectedExpansion.includes(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default ExpansionChangeOptions;
