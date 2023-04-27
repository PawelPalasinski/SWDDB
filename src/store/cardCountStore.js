import { create } from "zustand";

const cardCountStore = create((set) => ({
  cardCount: 0,
  cardRedCount: 0,
  cardYellowCount: 0,
  cardBlueCount: 0,
  cardGrayCount: 0,

  setCardCount: (count) => set((state) => ({ ...state, cardCount: count })),
  setCardRedCount: (count) =>
    set((state) => ({ ...state, cardRedCount: count })),
  setCardYellowCount: (count) =>
    set((state) => ({ ...state, cardYellowCount: count })),
  setCardBlueCount: (count) =>
    set((state) => ({ ...state, cardBlueCount: count })),
  setCardGrayCount: (count) =>
    set((state) => ({ ...state, cardGrayCount: count })),
}));

export default cardCountStore;
