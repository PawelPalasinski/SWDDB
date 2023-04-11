import React from "react";

const SearchByName = ({ searchQuery, setSearchQuery }) => {
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
