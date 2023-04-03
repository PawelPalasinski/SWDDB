import React from "react";

const RarityChangeOptions = ({
  filterRarityOptions,
  selectedRarity,
  setSelectedRarity,
}) => {
  const renderFilterButtons = () => {
    return filterRarityOptions.map((option) => {
      return (
        <button
          key={option.value}
          className={selectedRarity === option.value ? "active" : ""}
          onClick={() => setSelectedRarity(option.value)}
        >
          {option.label}
        </button>
      );
    });
  };

  return <div>{renderFilterButtons()}</div>;
};

export default RarityChangeOptions;