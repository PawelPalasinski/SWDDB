import React from "react";

const ExpansionChangeOptions = ({
  filterExpansionOptions,
  selectedExpansion,
  handleExpansionChange,
}) => {
  return (
    <div>
      <h3>Expansion</h3>
      {filterExpansionOptions.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedExpansion.includes(option.value)}
            onChange={handleExpansionChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default ExpansionChangeOptions;
