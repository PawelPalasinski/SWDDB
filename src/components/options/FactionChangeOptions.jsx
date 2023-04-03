import React from "react";

const FactionChangeOptions = ({
  filterFactionOptions,
  selectedFaction,
  setSelectedFaction,
}) => {
  const renderFilterButtons = () => {
    return filterFactionOptions.map((option) => {
      return (
        <button
          key={option.value}
          className={selectedFaction === option.value ? "active" : ""}
          onClick={() => setSelectedFaction(option.value)}
        >
          {option.label}
        </button>
      );
    });
  };

  return <div>{renderFilterButtons()}</div>;
};

export default FactionChangeOptions;
