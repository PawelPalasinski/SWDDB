import { create } from "zustand";

const useFilterStore = create((set, get) => ({
  selectedFaction: "",
  setSelectedFaction: (faction) =>
    set((state) => ({ ...state, selectedFaction: faction })),
  selectedRarity: "",
  setSelectedRarity: (rarity) =>
    set((state) => ({ ...state, selectedRarity: rarity })),
  selectedExpansion: [],
  setSelectedExpansion: (expansion) =>
    set((state) => ({ ...state, selectedExpansion: expansion })),
  searchQuery: "",
  setSearchQuery: (query) => set((state) => ({ ...state, searchQuery: query })),
}));

export default useFilterStore;
