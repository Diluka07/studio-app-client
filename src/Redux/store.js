import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
