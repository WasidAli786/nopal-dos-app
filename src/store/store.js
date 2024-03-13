import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";

export const useStore = create()(
  devtools((...a) => ({
    ...authSlice(...a),
    ...cartSlice(...a),
  }))
);
