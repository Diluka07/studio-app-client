import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import { getProduct } from "../../services/product";

const initialState = {
  productData: {
    loading: false,
    data: null,
    error: null,
  },
};

// thunk actions
export const getProductAsync = createAsyncThunk(
  "product/getProduct",
  async (id) => {
    const response = await getProduct(id);
    return response.data.data;
  }
);

export const customerSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductDataReset: (state) => {
      state.productData = initialState.productData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductAsync.pending, (state) => {
        state.productData.loading = true;
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.productData.loading = false;
        state.productData.data = action.payload;
        state.productData.error = null;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.productData.loading = false;
        state.productData.data = null;
        state.productData.error = action.error;
      });
  },
});

const { actions, reducer } = customerSlice;

export const { getProductDataReset } = actions;

export default reducer;
