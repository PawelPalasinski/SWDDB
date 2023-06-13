// collectionStore.js

import { create } from "zustand";

const useCollectionStore = (userId) =>
  create((set) => ({
    collection: JSON.parse(localStorage.getItem(`collection_${userId}`)) || [],
    initializeCollection: (initialData) => {
      localStorage.setItem(`collection_${userId}`, JSON.stringify(initialData));
      set({ collection: initialData });
      console.log("Collection initialized.");
    },

    handleAddOrRemoveFromCollection: (cardCode) => {
      const collection =
        JSON.parse(localStorage.getItem(`collection_${userId}`)) || [];
      const index = collection.findIndex((code) => code === cardCode);
      if (index !== -1) {
        // If the card is already in the collection, remove it
        const newCollection = [...collection];
        newCollection.splice(index, 1);
        localStorage.setItem(
          `collection_${userId}`,
          JSON.stringify(newCollection)
        );
        set({ collection: newCollection });
        console.log("Card removed from collection.");
      } else {
        // If the card is not in the collection, add it
        const newCollection = [...collection, cardCode];
        localStorage.setItem(
          `collection_${userId}`,
          JSON.stringify(newCollection)
        );
        set({ collection: newCollection });
        console.log("Card added to collection.");
      }
    },
    getButtonText: (cardCode) => {
      const collection =
        JSON.parse(localStorage.getItem(`collection_${userId}`)) || [];
      const index = collection.findIndex((code) => code === cardCode);
      if (index !== -1) {
        return "DEL";
      } else {
        return "ADD";
      }
    },
  }));

export default useCollectionStore;
