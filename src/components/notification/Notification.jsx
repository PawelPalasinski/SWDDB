import styled, { keyframes } from "styled-components";
import FalconSVG from "../svg/FalconSVG";
import useCollectionStore from "../../store/collectionStore";

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  left: ${({ action }) => (action === "add" ? "-100%" : "0%")};
  right: ${({ action }) => (action === "remove" ? "-100%" : "0%")};
  z-index: 100;
  animation: ${({ action }) => (action === "add" ? slideIn : slideOut)} 1s
    ease-in-out;
  animation-fill-mode: forwards;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Notification = () => {
  const action = useCollectionStore((state) => state.action);
  return (
    <NotificationContainer action={action}>
      <FalconSVG />
    </NotificationContainer>
  );
};

export default Notification;
