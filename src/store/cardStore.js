import { create } from "zustand";
import fetchSWDDB from "../js/api";

const useCardStore = create((set, get) => ({
  data: [],
  isLoading: true,

  fetchData: async () => {
    try {
      const response = await fetchSWDDB();
      set({ data: response, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
}));

export default useCardStore;
