import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/apiService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    console.log("here i am ");
    try {
      const data = await loginAPI(credentials);
      console.log(data, "data");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);
