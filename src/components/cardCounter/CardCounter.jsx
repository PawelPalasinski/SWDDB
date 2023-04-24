import React from "react";
import useCardCountStore from "../../store/cardCountStore";

function CardCounter() {
  const cardCount = useCardCountStore((state) => state.cardCount);

  return <div>Cards {cardCount}</div>;
}

export default CardCounter;
