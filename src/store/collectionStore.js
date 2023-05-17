import { create } from "zustand";

const useCollectionStore = create((set) => ({
  collection: JSON.parse(localStorage.getItem("collection")) || [],
  handleAddOrRemoveFromCollection: (cardCode) => {
    const collection = JSON.parse(localStorage.getItem("collection")) || [];
    const index = collection.findIndex((code) => code === cardCode);
    if (index !== -1) {
      // If the card is already in the collection, remove it
      const newCollection = [...collection];
      newCollection.splice(index, 1);
      localStorage.setItem("collection", JSON.stringify(newCollection));
      set({ collection: newCollection });
      console.log("Card removed from collection.");
    } else {
      // If the card is not in the collection, add it
      localStorage.setItem(
        "collection",
        JSON.stringify([...collection, cardCode])
      );
      set({ collection: [...collection, cardCode] });
      console.log("Card added to collection.");
    }
  },
  getButtonText: (cardCode) => {
    const collection = JSON.parse(localStorage.getItem("collection")) || [];
    const index = collection.findIndex((code) => code === cardCode);
    if (index !== -1) {
      return "DEL";
    } else {
      return "ADD";
    }
  },
}));

export default useCollectionStore;
