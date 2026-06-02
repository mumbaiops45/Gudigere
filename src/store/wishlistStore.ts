import { create } from "zustand";

import { persist } from "zustand/middleware";

import {
  WishlistProduct,
} from "../services/wishlistService";

interface WishlistStore {

  wishlistItems:
    WishlistProduct[];

  setWishlistItems: (
    items: WishlistProduct[]
  ) => void;

  clearWishlist: () => void;
}

const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set) => ({

        wishlistItems: [],

        setWishlistItems: (
          items
        ) =>
          set({
            wishlistItems:
              items,
          }),

        clearWishlist: () =>
          set({
            wishlistItems:
              [],
          }),
      }),
      {
        name:
          "wishlist-storage",
      }
    )
  );

export default useWishlistStore;