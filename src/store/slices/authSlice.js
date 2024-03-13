import { useLocalStorage } from "@/hooks/useLocalStorage";
import { deleteToken } from "@/utils/cookieActions";

const { getStorageItem, removeStorageItem } = useLocalStorage();

export const authSlice = (set) => ({
  user: getStorageItem("user"),
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    set({ user: null });
    removeStorageItem("user");
    removeStorageItem("token");
    deleteToken();
  },
});
