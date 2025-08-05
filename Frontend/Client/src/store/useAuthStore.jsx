import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // 🔹 Temporary email for reset-password flow
  tempEmail: "",
  setTempEmail: (email) => set({ tempEmail: email }),

  // 🔹 Auth state
  token: null,
  user: null,

  // 🔹 Login function
  login: ({ token, user }) =>
    set(() => ({
      token,
      user,
    })),

  // 🔹 Logout function
  logout: () =>
    set(() => ({
      token: null,
      user: null,
    })),
}));
