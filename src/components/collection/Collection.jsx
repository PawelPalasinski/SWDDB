import React from "react";
import useStore from "../../store/store";

function Collection() {
  const collection = useStore((state) => state.collection);

  return (
    <ul>
      My Collection:
      {collection.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export default Collection;
