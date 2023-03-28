import React from "react";
import CardImage from "./CardImage";

const CardList = ({ cards }) => {
  return (
    <ul className="cardList">
      {cards.map((c) => (
        <li key={c.code}>
          <p>{c.name}</p>
          <CardImage src={c.imagesrc} alt={c.name} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
