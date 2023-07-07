import { create } from "zustand";

const cardCountStore = create((set) => ({
  // All

  cardCount: 0,

  // Faction

  cardRedCount: 0,
  cardYellowCount: 0,
  cardBlueCount: 0,
  cardGrayCount: 0,

  // Rarity

  cardLCount: 0,
  cardRCount: 0,
  cardUCount: 0,
  cardCCount: 0,

  // Expansion

  cardSorCount: 0,
  cardEaWCount: 0,
  cardTPGCount: 0,
  cardLEGCount: 0,
  cardRIVCount: 0,
  cardWotFCount: 0,
  cardAtGCount: 0,
  cardCONVCount: 0,
  cardAoNCount: 0,
  cardSoHCount: 0,
  cardCMCount: 0,
  cardTRCount: 0,

  // All
  setCardCount: (count) => set((state) => ({ ...state, cardCount: count })),

  // Faction

  setCardRedCount: (count) =>
    set((state) => ({ ...state, cardRedCount: count })),
  setCardYellowCount: (count) =>
    set((state) => ({ ...state, cardYellowCount: count })),
  setCardBlueCount: (count) =>
    set((state) => ({ ...state, cardBlueCount: count })),
  setCardGrayCount: (count) =>
    set((state) => ({ ...state, cardGrayCount: count })),

  // Rarity

  setLCount: (count) => set((state) => ({ ...state, cardLCount: count })),
  setRCount: (count) => set((state) => ({ ...state, cardRCount: count })),
  setUCount: (count) => set((state) => ({ ...state, cardUCount: count })),
  setCCount: (count) => set((state) => ({ ...state, cardCCount: count })),

  // Expansion

  setAWCount: (count) => set((state) => ({ ...state, cardAWCount: count })),
  setSorCount: (count) => set((state) => ({ ...state, cardSorCount: count })),
  setEaWCount: (count) => set((state) => ({ ...state, cardEaWCount: count })),
  setTPGCount: (count) => set((state) => ({ ...state, cardTPGCount: count })),
  setLEGCount: (count) => set((state) => ({ ...state, cardLEGCount: count })),
  setRIVCount: (count) => set((state) => ({ ...state, cardRIVCount: count })),
  setWotFCount: (count) => set((state) => ({ ...state, cardWotFCount: count })),
  setAtGCount: (count) => set((state) => ({ ...state, cardAtGCount: count })),
  setCONVCount: (count) => set((state) => ({ ...state, cardCONVCount: count })),
  setAoNCount: (count) => set((state) => ({ ...state, cardAoNFCount: count })),
  setSoHCount: (count) => set((state) => ({ ...state, cardSoHCount: count })),
  setCMCount: (count) => set((state) => ({ ...state, cardCMCount: count })),
  setTRCount: (count) => set((state) => ({ ...state, cardTRCount: count })),
}));

export default cardCountStore;
