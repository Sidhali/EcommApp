import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "./searchThunk";

const searchSlice = createSlice({
  name: "search",

  initialState: {
    results: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Search failed";
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
