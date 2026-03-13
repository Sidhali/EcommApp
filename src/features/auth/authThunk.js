import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/apiService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginAPI(credentials);

      localStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);
