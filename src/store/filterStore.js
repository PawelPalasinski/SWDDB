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
  filterData: () => {
    const { data } = get();
    const { selectedFaction, selectedRarity, selectedExpansion, searchQuery } =
      get();

    let filteredData = data.filter((item) => {
      if (
        selectedFaction &&
        selectedFaction !== "all" &&
        item.faction_code !== selectedFaction
      ) {
        return false;
      }

      if (
        selectedRarity &&
        selectedRarity !== "all" &&
        item.rarity_code !== selectedRarity
      ) {
        return false;
      }

      if (
        selectedExpansion &&
        selectedExpansion.length > 0 &&
        !selectedExpansion.includes(item.set_code)
      ) {
        return false;
      }

      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    return filteredData;
  },
}));

export default useFilterStore;
