import { create } from "zustand";

const cardCountStore = create((set) => ({
  cardCount: 0,
  setCardCount: (count) => set((state) => ({ ...state, cardCount: count })),
}));

export default cardCountStore;
