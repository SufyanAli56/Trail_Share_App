import { create } from "zustand";

export const useAuthStore = create((set) => ({
  tempEmail: "",
  setTempEmail: (email) => set({ tempEmail: email }),
}));
