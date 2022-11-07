import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertData: {
    alert_set: false,
    msg: "",
    alert_type: "",
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alertDataReset: (state) => {
      state.alertData = initialState.alertData;
    },
    setAlertData: (state, action) => {
      state.alertData.alert_set = true;
      state.alertData.msg = action.payload.msg;
      state.alertData.alert_type = action.payload.alertType;
    },
  },
});

const { actions, reducer } = alertSlice;

export const { alertDataReset, setAlertData } = actions;

export default reducer;
