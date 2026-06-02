import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoryStore = create(
  persist(
    (set) => ({
      categories: [],

      setCategories: (categories) => set({ categories }),
    }),
    { name: "gudigear-categories" }
  )
);

export default useCategoryStore;