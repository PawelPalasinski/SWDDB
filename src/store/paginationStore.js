import { create } from "zustand";

const usePaginationStore = create((set) => ({
  currentPage: 1,
  dataPerPage: 20,
  setCurrentPage: (pageNumber) => set(() => ({ currentPage: pageNumber })),
  setDataPerPage: (itemsPerPage) => set(() => ({ dataPerPage: itemsPerPage })),
}));

export default usePaginationStore;
