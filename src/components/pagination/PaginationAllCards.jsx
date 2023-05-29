import React from "react";
import styled from "styled-components";

import usePaginationStore from "../../store/paginationStore";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const ButtonPrev = styled.button`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 2em 0 0 2em;
  background-color: #ffd700;
  cursor: pointer;
  text-shadow: 1px 1px 2px #000, 0 0 1em red, 0 0 0.2em #000;
  transition: all 0.2s ease-in-out;
  width: 100px;

  &:hover {
    background-color: #fff;
  }

  &:disabled {
    display: none;
  }
`;

const ButtonNext = styled.button`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0 2em 2em 0;
  background-color: #ffd700;
  cursor: pointer;
  text-shadow: 1px 1px 2px #000, 0 0 1em red, 0 0 0.2em #000;
  transition: all 0.2s ease-in-out;
  width: 100px;

  &:hover {
    background-color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  margin: 0 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
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
      <ButtonPrev onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </ButtonPrev>
      <PageNumber>
        {currentPage} of {totalPages}
      </PageNumber>
      <ButtonNext
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </ButtonNext>
    </PaginationWrapper>
  );
};

export default PaginationAllCards;
