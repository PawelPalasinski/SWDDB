import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  overflow: auto;
`;

const ModalContent = styled.div`
  border-radius: 8px;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.44);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const CloseButton = styled.button`
  padding: 10px;
  display: block;
  background-color: #ffd700;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 2em;
  padding: 5px;
  width: 50%;
  heigth: 60px;
  border: none;
  text-shadow: 1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000;
  margin: 0 0 10px 25%;
  &:hover {
    background-color: #fff;
    color: #ffd700;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
