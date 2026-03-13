import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAPI,
  getProductByIdAPI,
  getCategoriesAPI,
  getProductsByCategoryAPI,
} from "../../services/apiService";

// --------------------------- ALL PRODUCTS ---------------------------------------
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, thunkAPI) => {
    try {
      const { page = 1, limit = 10 } = params;
      const skip = (page - 1) * limit;
      console.log("params:", params);
      const data = await getProductsAPI(limit, skip);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  },
);

// --------------------------- SINGLE PRODUCT -------------------------------------
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const data = await getProductByIdAPI(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  },
);

// ----------------------------------- CATEGORIES --------------------------------------
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const data = await getCategoriesAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  },
);

// --------------------------------- PRODUCTS BY CATEGORY --------------------------------
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, thunkAPI) => {
    try {
      const data = await getProductsByCategoryAPI(category);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  },
);
