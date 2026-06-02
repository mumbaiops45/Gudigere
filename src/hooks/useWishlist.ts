"use client";

import { useEffect } from "react";

import { getWishlist } from "../services/wishlistService";
import useWishlistStore from "../store/wishlistStore";
import useAuthStore from "../store/authStore";

export default function useWishlist() {

  const { token: storeToken } = useAuthStore() as { token: string | null };

  // authStore has no persist — fall back to localStorage so fetch still works
  // on page refresh before LayoutWrapper hydrates the store
  const token =
    storeToken ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const { wishlistItems, setWishlistItems } = useWishlistStore();

  const fetchWishlist = async () => {

    if (!token) return;   // not logged in — keep store as-is

    try {

      const data = await getWishlist();

      // Handle every API response shape so we never wipe the store accidentally
      const products =
        data?.wishlist?.products ??
        data?.products ??
        (Array.isArray(data?.wishlist) ? data.wishlist : null) ??
        (Array.isArray(data) ? data : null);

      if (products !== null) {
        setWishlistItems(products);
      }

    } catch (error) {
      console.log(error);
      // Do NOT clear store on error
    }
  };

  // Re-run whenever token changes (LayoutWrapper hydrates authStore async)
  useEffect(() => {
    fetchWishlist();
  }, [token]);

  return { wishlistItems, fetchWishlist };
}
