import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slice/authSlice';

/* Configured Store */
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
