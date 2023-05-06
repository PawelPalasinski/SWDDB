import React from "react";
import styled from "styled-components";

import usePaginationStore from "../../store/paginationStore";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  button {
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #f1f1f1;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #ddd;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 1rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const PaginationAllCards = ({ totalPages }) => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <PaginationWrapper>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </PaginationWrapper>
  );
};

export default PaginationAllCards;
