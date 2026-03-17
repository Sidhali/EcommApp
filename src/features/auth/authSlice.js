import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    isLoggedIn: !localStorage.getItem("accessToken"),
    loading: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    // loginSuccess: (state) => {
    //   state.isLoggedIn = true;
    // },
    // loginFailure: (state, action) => {
    //   state.error = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loginSuccess, loginFailure, clearAuthError } =
  authSlice.actions;
export default authSlice.reducer;
