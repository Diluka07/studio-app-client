import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import {
  customerRegister,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
} from "../../services/customer";

const initialState = {
  customerRegisterData: {
    loading: false,
    data: null,
    error: null,
  },
  customersData: {
    loading: false,
    data: [],
    error: null,
  },
  customerData: {
    loading: false,
    data: null,
    error: null,
  },
  customerUpdateResponseData: {
    loading: false,
    data: null,
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

export const getAllCustomersAsync = createAsyncThunk(
  "customer/getAllCustomers",
  async () => {
    const response = await getAllCustomers();
    console.log(response.data.data);
    return response.data.data;
  }
);

export const getSingleCustomerAsync = createAsyncThunk(
  "customer/getSingleCustomer",
  async (id) => {
    const response = await getSingleCustomer(id);
    return response.data.data;
  }
);

export const updateCustomerAsync = createAsyncThunk(
  "customer/updateCustomer",
  async (data) => {
    const response = await updateCustomer(data);
    return response.data.data;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerRegisterDataReset: (state) => {
      state.customerRegisterData = initialState.customerRegisterData;
    },
    customersDataReset: (state) => {
      state.customersData = initialState.customersData;
    },
    customerDataReset: (state) => {
      state.customerData = initialState.customerData;
    },
    customerUpdateResponseDataReset: (state) => {
      state.customerUpdateResponseData =
        initialState.customerUpdateResponseData;
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
    builder
      .addCase(getAllCustomersAsync.pending, (state) => {
        state.customersData.loading = true;
      })
      .addCase(getAllCustomersAsync.fulfilled, (state, action) => {
        state.customersData.loading = false;
        state.customersData.data = action.payload;
        state.customersData.error = null;
      })
      .addCase(getAllCustomersAsync.rejected, (state, action) => {
        state.customersData.loading = false;
        state.customersData.data = [];
        state.customersData.error = action.error;
      });
    builder
      .addCase(getSingleCustomerAsync.pending, (state) => {
        state.customerData.loading = true;
      })
      .addCase(getSingleCustomerAsync.fulfilled, (state, action) => {
        state.customerData.loading = false;
        state.customerData.data = action.payload;
        state.customerData.error = null;
      })
      .addCase(getSingleCustomerAsync.rejected, (state, action) => {
        state.customerData.loading = false;
        state.customerData.data = null;
        state.customerData.error = action.error;
      });
    builder
      .addCase(updateCustomerAsync.pending, (state) => {
        state.customerUpdateResponseData.loading = true;
      })
      .addCase(updateCustomerAsync.fulfilled, (state, action) => {
        state.customerUpdateResponseData.loading = false;
        state.customerUpdateResponseData.data = action.payload;
        state.customerUpdateResponseData.error = null;
      })
      .addCase(updateCustomerAsync.rejected, (state, action) => {
        state.customerUpdateResponseData.loading = false;
        state.customerUpdateResponseData.data = false;
        state.customerUpdateResponseData.error = action.error;
      });
  },
});

const { actions, reducer } = customerSlice;

export const {
  customerRegisterDataReset,
  customersDataReset,
  customerDataReset,
  customerUpdateResponseDataReset,
} = actions;

export default reducer;
