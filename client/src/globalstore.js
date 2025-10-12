// store/globalStore.js
import { create } from "zustand";

const useGlobalStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));

export default useGlobalStore;
