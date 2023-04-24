import React from "react";
import { filterExpansionOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";

const ExpansionChangeOptions = () => {
  const { selectedExpansion, setSelectedExpansion } = useFilterStore();

  return (
    <div>
      <h3>Expansion</h3>
      {filterExpansionOptions.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedExpansion.includes(option.value)}
            onChange={() => setSelectedExpansion(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default ExpansionChangeOptions;
