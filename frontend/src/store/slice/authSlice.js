/* Imported items */
import { createSlice } from "@reduxjs/toolkit";

/* InitialState of Auth slice  */
const initialState = {
  user: null,
  isAuthenticated: false,
};

/* Auth slice creted */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* Login reducer */
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    /* Logout reducer */
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});


/* Multipe slice actions exported here */
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
