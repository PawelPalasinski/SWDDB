import React from "react";
import useCardCountStore from "../../store/cardCountStore";

function CardCounter() {
  const cardCount = useCardCountStore((state) => state.cardCount);
  const cardRedCount = useCardCountStore((state) => state.cardRedCount);
  const cardYellowCount = useCardCountStore((state) => state.cardYellowCount);
  const cardBlueCount = useCardCountStore((state) => state.cardBlueCount);
  const cardGrayCount = useCardCountStore((state) => state.cardGrayCount);

  return (
    <>
      <div>Cards {cardCount}</div>;<div>Cards {cardRedCount}</div>;
      <div>Cards {cardYellowCount}</div>;<div>Cards {cardBlueCount}</div>;
      <div>Cards {cardGrayCount}</div>;
    </>
  );
}

export default CardCounter;
