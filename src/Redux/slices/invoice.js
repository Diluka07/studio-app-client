import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import {
  createProductinvoice,
  getAllProductinvoices,
  getSingleProductinvoice,
  finishProductinvoice
} from "../../services/invoice";

const initialState = {
  productInvoiceCreateResponse: {
    loading: false,
    data: null,
    error: null,
  },
  productInvoices: {
    loading: false,
    data: [],
    error: null,
  },
  invoiceData: {
    loading: false,
    data: null,
    error: null,
  },
  invoiceFinisResponse: {
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

export const getAllProductinvoicesAsync = createAsyncThunk(
  "invoice/getAllProductinvoices",
  async () => {
    const response = await getAllProductinvoices();
    return response.data.data;
  }
);

export const getSingleProductInvoiceAsync = createAsyncThunk(
  "invoice/getSingleProductInvoice",
  async (id) => {
    const response = await getSingleProductinvoice(id);
    return response.data.data;
  }
);


export const finishProductInvoiceAsync = createAsyncThunk(
  "invoice/finishProductInvoice",
  async (data) => {
    const response = await finishProductinvoice(data);
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
    productInvoicesDataReset: (state) => {
      state.productInvoices = initialState.productInvoices;
    },
    invoiceDataReset: (state) => {
      state.invoiceData = initialState.invoiceData;
    },
    invoiceFinishResponseReset: (state) => {
      state.invoiceFinisResponse = initialState.invoiceFinisResponse;
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
    builder
      .addCase(getAllProductinvoicesAsync.pending, (state) => {
        state.productInvoices.loading = true;
      })
      .addCase(getAllProductinvoicesAsync.fulfilled, (state, action) => {
        state.productInvoices.loading = false;
        state.productInvoices.data = action.payload;
        state.productInvoices.error = null;
      })
      .addCase(getAllProductinvoicesAsync.rejected, (state, action) => {
        state.productInvoices.loading = false;
        state.productInvoices.data = false;
        state.productInvoices.error = action.error;
      });
    builder
      .addCase(getSingleProductInvoiceAsync.pending, (state) => {
        state.invoiceData.loading = true;
      })
      .addCase(getSingleProductInvoiceAsync.fulfilled, (state, action) => {
        state.invoiceData.loading = false;
        state.invoiceData.data = action.payload;
        state.invoiceData.error = null;
      })
      .addCase(getSingleProductInvoiceAsync.rejected, (state, action) => {
        state.invoiceData.loading = false;
        state.invoiceData.data = false;
        state.invoiceData.error = action.error;
      });
    builder
      .addCase(finishProductInvoiceAsync.pending, (state) => {
        state.invoiceFinisResponse.loading = true;
      })
      .addCase(finishProductInvoiceAsync.fulfilled, (state, action) => {
        state.invoiceFinisResponse.loading = false;
        state.invoiceFinisResponse.data = action.payload;
        state.invoiceFinisResponse.error = null;
      })
      .addCase(finishProductInvoiceAsync.rejected, (state, action) => {
        state.invoiceFinisResponse.loading = false;
        state.invoiceFinisResponse.data = null;
        state.invoiceFinisResponse.error = action.error;
      });
  },
});

const { actions, reducer } = invoiceSlice;

export const {
  createProductinvoiceResponseDataReset,
  productInvoicesDataReset,
  invoiceDataReset,
  invoiceFinishResponseReset
} = actions;

export default reducer;
