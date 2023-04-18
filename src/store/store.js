import { create } from "zustand";

const useStore = create((set) => ({
  collection: [],
  handleAddToCollection: (card) => {
    set((state) => {
      console.log("Added card id: :", card);
      const newCollection =
        JSON.parse(localStorage.getItem("collection")) || [];
      if (!newCollection.includes(card)) {
        localStorage.setItem(
          "collection",
          JSON.stringify([...newCollection, card])
        );
        return { collection: [...newCollection, card] };
      }
      return { collection: newCollection };
    });
  },
}));

export default useStore;
