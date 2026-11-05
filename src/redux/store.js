import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.value));
});
