import React from "react";
import { filterFactionOptions } from "../../js/options";
import useFilterStore from "../../store/filterStore";

const FactionChangeOptions = () => {
  const { selectedFaction, setSelectedFaction } = useFilterStore();

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
