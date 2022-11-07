import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication";
import customerReducer from "./slices/customer";
import alertReducer from "./slices/alert";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    customer: customerReducer,
    alert: alertReducer,
  },
});
