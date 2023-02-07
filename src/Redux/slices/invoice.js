import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import { createProductinvoice } from "../../services/invoice";

const initialState = {
  productInvoiceCreateResponse: {
    loading: false,
    data: null,
    error: null,
  },
};

// thunk actions
export const createProductinvoiceAsync = createAsyncThunk(
  "invoice/createProductinvoice",
  async (data) => {
    const response = await createProductinvoice(data);
    return response.data;
  }
);

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    createProductinvoiceResponseDataReset: (state) => {
      state.productInvoiceCreateResponse =
        initialState.productInvoiceCreateResponse;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductinvoiceAsync.pending, (state) => {
        state.productInvoiceCreateResponse.loading = true;
      })
      .addCase(createProductinvoiceAsync.fulfilled, (state, action) => {
        state.productInvoiceCreateResponse.loading = false;
        state.productInvoiceCreateResponse.data = action.payload;
        state.productInvoiceCreateResponse.error = null;
      })
      .addCase(createProductinvoiceAsync.rejected, (state, action) => {
        state.productInvoiceCreateResponse.loading = false;
        state.productInvoiceCreateResponse.data = false;
        state.productInvoiceCreateResponse.error = action.error;
      });
  },
});

const { actions, reducer } = invoiceSlice;

export const { createProductinvoiceResponseDataReset } = actions;

export default reducer;
