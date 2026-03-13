import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchProductsAPI } from "../../services/apiService";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query) => {
    const data = await searchProductsAPI(query);
    return data;
  },
);
