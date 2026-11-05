import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: loadState(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.value.find((item) => item.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.value.push({ ...product, qty: 1 });
      }
    },

    increment: (state, action) => {
      const product = state.value.find((item) => item.id === action.payload);

      if (product) product.qty += 1;
    },

    decrement: (state, action) => {
      const product = state.value.find((item) => item.id === action.payload);

      if (product && product.qty > 1) {
        product.qty -= 1;
      }
    },

    removeCart: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.value = [];
    },
  },
});

export const { addToCart, increment, decrement, removeCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
