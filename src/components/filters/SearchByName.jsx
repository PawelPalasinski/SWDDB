import React from "react";
import useFilterStore from "../../store/filterStore";

const SearchByName = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by card name..."
      />
    </div>
  );
};

export default SearchByName;
