import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const existing = get().cartItems.find((item) => item._id === product._id);
        if (existing) {
          set({
            cartItems: get().cartItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
          });
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              { ...product, quantity: product.quantity || 1 },
            ],
          });
        }
      },

      removeFromCart: (id) =>
        set({ cartItems: get().cartItems.filter((item) => item._id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ cartItems: get().cartItems.filter((item) => item._id !== id) });
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item._id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ cartItems: [] }),

      // Legacy setter kept for compatibility
      setCartItems: (items) => set({ cartItems: items }),
    }),
    { name: "gudigear-cart" }
  )
);

export default useCartStore;
