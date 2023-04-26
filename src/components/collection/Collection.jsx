import React, { lazy, Suspense } from "react";
import useStore from "../../store/collectionStore";
import useCardStore from "../../store/cardStore";

const CardImage = lazy(() => import("../cardImage/CardImage"));

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
        <li key={item.code}>
          <p>{item.name}</p>
          <p>{item.code}</p>
          <p>{item.faction_code}</p>
          <p>{item.set_name}</p>
          <Suspense fallback={<div>Loading...</div>}>
            <CardImage className="image" src={item.imagesrc} alt={item.name} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}

export default Collection;
