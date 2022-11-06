import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import { customerRegister } from "../../services/customer";

const initialState = {
  customerRegisterData: {
    loading: false,
    data: false,
    error: null,
  },
};

// thunk actions
export const customerRegisterAsync = createAsyncThunk(
  "customer/customerRegister",
  async (data) => {
    const response = await customerRegister(data);
    return response.data;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerRegisterDataReset: (state) => {
      state.customerRegisterData = initialState.customerRegisterData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customerRegisterAsync.pending, (state) => {
        state.customerRegisterData.loading = true;
      })
      .addCase(customerRegisterAsync.fulfilled, (state, action) => {
        state.customerRegisterData.loading = false;
        state.customerRegisterData.data = action.payload;
        state.customerRegisterData.error = null;
      })
      .addCase(customerRegisterAsync.rejected, (state, action) => {
        state.customerRegisterData.loading = false;
        state.customerRegisterData.data = false;
        state.customerRegisterData.error = action.error;
      });
  },
});

const { actions, reducer } = customerSlice;

export const { customerRegisterDataReset } = actions;

export default reducer;
