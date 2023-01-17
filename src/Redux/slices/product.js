import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import {
  addNewItem,
  getAllCategories,
  getAllMusicalItems,
  getProduct,
  updateMusicalItem,
} from "../../services/product";

const initialState = {
  addNewItemData: {
    loading: false,
    data: null,
    error: null,
  },
  categoriesData: {
    loading: false,
    data: [],
    error: null,
  },
  musicalItemsData: {
    loading: false,
    data: [],
    error: null,
  },
  productData: {
    loading: false,
    data: null,
    error: null,
  },
  musicalItemUpdateResponseData: {
    loading: false,
    data: null,
    error: null,
  },
};

// thunk actions
export const addNewItemAsync = createAsyncThunk(
  "musicalItem/addNewItem",
  async (data) => {
    const response = await addNewItem(data);
    return response.data.data;
  }
);
export const getAllCategoriesAsync = createAsyncThunk(
  "musicalItem/getAllCategories",
  async (data) => {
    const response = await getAllCategories(data);
    return response.data.data;
  }
);
export const getAllMusicalItemsAsync = createAsyncThunk(
  "musicalItem/getAllMusicalItems",
  async () => {
    const response = await getAllMusicalItems();
    return response.data.data;
  }
);
export const getProductAsync = createAsyncThunk(
  "product/getProduct",
  async (id) => {
    const response = await getProduct(id);
    return response.data.data;
  }
);
export const updateMusicalItemAsync = createAsyncThunk(
  "musicalItem/updateMusicalIte",
  async (data) => {
    const response = await updateMusicalItem(data);
    return response.data.data;
  }
);

export const customerSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addNewItemDataReset: (state) => {
      state.addNewItemData = initialState.addNewItemData;
    },
    getAllCategoriesDataReset: (state) => {
      state.categoriesData = initialState.categoriesData;
    },
    getAllMusicalItemsDataReset: (state) => {
      state.musicalItemsData = initialState.musicalItemsData;
    },
    getProductDataReset: (state) => {
      state.productData = initialState.productData;
    },
    updateMusicalItemDataReset: (state) => {
      state.musicalItemUpdateResponseData =
        initialState.musicalItemUpdateResponseData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewItemAsync.pending, (state) => {
        state.addNewItemData.loading = true;
      })
      .addCase(addNewItemAsync.fulfilled, (state, action) => {
        state.addNewItemData.loading = false;
        state.addNewItemData.data = action.payload;
        state.addNewItemData.error = null;
      })
      .addCase(addNewItemAsync.rejected, (state, action) => {
        state.addNewItemData.loading = false;
        state.addNewItemData.data = null;
        state.addNewItemData.error = action.error;
      });
    builder
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.categoriesData.loading = true;
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.categoriesData.loading = false;
        state.categoriesData.data = action.payload;
        state.categoriesData.error = null;
      })
      .addCase(getAllCategoriesAsync.rejected, (state, action) => {
        state.categoriesData.loading = false;
        state.categoriesData.data = null;
        state.categoriesData.error = action.error;
      });
    builder
      .addCase(getAllMusicalItemsAsync.pending, (state) => {
        state.musicalItemsData.loading = true;
      })
      .addCase(getAllMusicalItemsAsync.fulfilled, (state, action) => {
        state.musicalItemsData.loading = false;
        state.musicalItemsData.data = action.payload;
        state.musicalItemsData.error = null;
      })
      .addCase(getAllMusicalItemsAsync.rejected, (state, action) => {
        state.musicalItemsData.loading = false;
        state.musicalItemsData.data = null;
        state.musicalItemsData.error = action.error;
      });
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
    builder
      .addCase(updateMusicalItemAsync.pending, (state) => {
        state.musicalItemUpdateResponseData.loading = true;
      })
      .addCase(updateMusicalItemAsync.fulfilled, (state, action) => {
        state.musicalItemUpdateResponseData.loading = false;
        state.musicalItemUpdateResponseData.data = action.payload;
        state.musicalItemUpdateResponseData.error = null;
      })
      .addCase(updateMusicalItemAsync.rejected, (state, action) => {
        state.musicalItemUpdateResponseData.loading = false;
        state.musicalItemUpdateResponseData.data = null;
        state.musicalItemUpdateResponseData.error = action.error;
      });
  },
});

const { actions, reducer } = customerSlice;

export const {
  addNewItemDataReset,
  getAllCategoriesDataReset,
  getAllMusicalItemsDataReset,
  getProductDataReset,
  updateMusicalItemDataReset,
} = actions;

export default reducer;
