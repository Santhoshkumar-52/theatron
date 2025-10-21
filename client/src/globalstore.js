// store/globalStore.js
import { create } from "zustand";

const useGlobalStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    baseURL: 'http://localhost:5000/'
}));

export { useGlobalStore };
