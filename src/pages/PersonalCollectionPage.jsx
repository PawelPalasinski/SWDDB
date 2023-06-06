import React from "react";
import Collection from "../components/collection/Collection";
import useCollectionStore from "../store/collectionStore";
import EmptyCollection from "../components/emptyCollection/EmptyCollection";

const PersonalCollectionPage = () => {
  const collection = useCollectionStore((state) => state.collection);
  const isEmpty = collection.length === 0;

  return (
    <>
      {isEmpty ? (
        <EmptyCollection />
      ) : (
        <>
          <p>My Collection:</p>
          <Collection />
        </>
      )}
    </>
  );
};

export default PersonalCollectionPage;
