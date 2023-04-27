import React from "react";
import useCardCountStore from "../../store/cardCountStore";
import Statistics from "../statistics/Statistics";

function CardCounter() {
  const cardCount = useCardCountStore((state) => state.cardCount);
  const cardRedCount = useCardCountStore((state) => state.cardRedCount);
  const cardYellowCount = useCardCountStore((state) => state.cardYellowCount);
  const cardBlueCount = useCardCountStore((state) => state.cardBlueCount);
  const cardGrayCount = useCardCountStore((state) => state.cardGrayCount);

  return (
    <>
      <div>Cards {cardCount}</div>
      <div>Red {cardRedCount}</div>
      <div>Yellow {cardYellowCount}</div>
      <div>Blue {cardBlueCount}</div>
      <div>Gray {cardGrayCount}</div>
      <Statistics />
    </>
  );
}

export default CardCounter;
