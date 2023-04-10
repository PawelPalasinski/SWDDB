import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    data: [],
    isLoading: true,
    selectedFaction: "",
    selectedRarity: "",
    selectedExpansion: "",
    searchQuery: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedFaction: (state, action) => {
      state.selectedFaction = action.payload;
    },
    setSelectedRarity: (state, action) => {
      state.selectedRarity = action.payload;
    },
    setSelectedExpansion: (state, action) => {
      state.selectedExpansion = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setData,
  setIsLoading,
  setSelectedFaction,
  setSelectedRarity,
  setSelectedExpansion,
  setSearchQuery,
} = appSlice.actions;

export default appSlice.reducer;
