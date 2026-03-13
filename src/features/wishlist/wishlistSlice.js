import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishList: (state, action) => {
      const id = action.payload;
      state.items = state.items.includes(id)
        ? state.items.filter((i) => i !== id)
        : [...state.items, id];
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishList, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
