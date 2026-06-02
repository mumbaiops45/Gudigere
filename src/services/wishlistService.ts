import API from "./api";


// TOKEN
const getToken = (): string | null => {

  if (
    typeof window !==
    "undefined"
  ) {
    return localStorage.getItem(
      "token"
    );
  }

  return null;
};


// PRODUCT TYPE
export interface WishlistProduct {

  _id: string;

  name: string;

  description: string;

  price: number;

  stock: number;

  images: string[];
}


// ==========================
// GET WISHLIST
// ==========================
export const getWishlist =
  async () => {

    const res =
      await API.get(
        "/wishlist",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// ==========================
// ADD TO WISHLIST
// ==========================
export const addToWishlist =
  async (
    productId: string
  ) => {

    const res =
      await API.post(
        "/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// ==========================
// REMOVE ITEM
// ==========================
export const removeWishlistItem =
  async (
    productId: string
  ) => {

    const res =
      await API.delete(
        `/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };


// ==========================
// CLEAR WISHLIST
// ==========================
export const clearWishlist =
  async () => {

    const res = 
      await API.delete(
        "/wishlist",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return res.data;
  };