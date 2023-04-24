import React from "react";
import useStore from "../../store/collectionStore";
import useCardStore from "../../store/cardStore";

function Collection() {
  const collection = useStore((state) => state.collection);
  const data = useCardStore((state) => state.data);

  const filteredData = data.filter((item) => {
    const code = collection.find((x) => x === item.code);
    return code !== undefined;
  });

  return (
    <ul>
      My Collection:
      {filteredData.map((item) => (
        <li key={item.code}>{item.name}</li>
      ))}
    </ul>
  );
}

export default Collection;
