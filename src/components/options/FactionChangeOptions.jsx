import React from "react";

const FactionChangeOptions = ({
  filterFactionOptions,
  selectedFaction,
  setSelectedFaction,
  cardsCount,
}) => {
  const renderFilterButtons = () => {
    console.log(cardsCount);
    return filterFactionOptions.map((option) => {
      return (
        <button
          key={option.value}
          className={selectedFaction === option.value ? "active" : ""}
          onClick={() => setSelectedFaction(option.value)}
        >
          {option.label} {cardsCount}
        </button>
      );
    });
  };

  return <div>{renderFilterButtons()}</div>;
};

export default FactionChangeOptions;
