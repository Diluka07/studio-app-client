import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication";
import customerReducer from "./slices/customer";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    customer: customerReducer,
  },
});
