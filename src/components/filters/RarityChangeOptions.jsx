import React from "react";
import { filterRarityOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";

const RarityChangeOptions = () => {
  const { selectedRarity, setSelectedRarity } = useFilterStore();

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
