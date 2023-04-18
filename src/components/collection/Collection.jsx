import React from "react";
import useStore from "../../store/store";

function Collection() {
  const collection = useStore((state) => state.collection);
  //   const handleAddToCollection = useStore(
  //     (state) => state.handleAddToCollection
  //   );

  return <div>My Collection: {collection}</div>;
}

export default Collection;
