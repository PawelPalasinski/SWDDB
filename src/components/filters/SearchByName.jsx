import React from "react";
import styled from "styled-components";
import useFilterStore from "../../store/filterStore";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  @media screen and (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 25rem;
  padding: 0.5rem;
  border: none;
  border-radius: 2rem;
  background-color: #f5f5f5;
  transition: box-shadow 0.2s ease-in-out;
  color: black;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px rgba(255, 0, 0, 0.75);
  }

  &:hover {
    background-color: #ebebeb;
    box-shadow: 0px 0px 5px 0px rgba(255, 0, 0, 0.75);
  }

  @media screen and (max-width: 768px) {
    max-width: 20rem;
  }
`;

const SearchByName = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by card name..."
      />
    </SearchWrapper>
  );
};

export default SearchByName;
