import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (!existing) {
        state.items.push({
          ...item,
          quantity: item.quantity,
        });
        state.totalQuantity += item.quantity;
      }
    },

    increment(state, action) {
      const item = state.items.find((i) => i.id === action.payload);

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
        state.totalQuantity += 1;
      }
    },

    decrement(state, action) {
      const item = state.items.find((i) => i.id === action.payload);

      if (item && item.quantity > item.minimumOrderQuantity) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;

      state.totalQuantity -= item.quantity;
      state.items = state.items.filter((i) => i.id != action.payload);
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, setQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
