import { create } from "zustand";

const useAuthStore = create(
  (set) => ({
    user: null,

    token: null,

    setAuth: (
      user,
      token
    ) =>
      set({
        user,
        token,
      }),

    logout: () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      set({
        user: null,
        token: null,
      });
    },
  })
);

export default useAuthStore;