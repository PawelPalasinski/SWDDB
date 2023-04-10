import React from "react";

const ExpansionChangeOptions = ({
  filterExpansionOptions,
  selectedExpansion,
  setSelectedExpansion,
}) => {
  const renderFilterButtons = () => {
    return filterExpansionOptions.map((option) => {
      return (
        <button
          key={option.value}
          className={selectedExpansion === option.value ? "active" : ""}
          onClick={() => setSelectedExpansion(option.value)}
        >
          {option.label}
        </button>
      );
    });
  };

  return <div>{renderFilterButtons()}</div>;
};

export default ExpansionChangeOptions;
