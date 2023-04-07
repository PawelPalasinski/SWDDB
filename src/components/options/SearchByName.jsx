import React from "react";

const SearchByName = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by card name..."
    />
  );
};

export default SearchByName;
