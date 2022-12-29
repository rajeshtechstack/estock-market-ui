import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isLoggedIn: false },
  reducers: {
    setCredentials: (state, action) => {
      const { username, access_token, isLoggedIn } = action.payload;
      state.user = username;
      state.token = access_token;
      state.isLoggedIn = isLoggedIn;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
