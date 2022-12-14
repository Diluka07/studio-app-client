import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import {
  addNewItem,
  getAllCategories,
  getAllMusicalItems,
  getExistingMusicalItem
} from "../../services/musicalItem";

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
  musicalItemData: {
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
export const getExistingMusicalItemAsync = createAsyncThunk(
  "musicalItem/getExistingMusicalItem",
  async (id) => {
    const response = await getExistingMusicalItem(id);
    return response.data.data;
  }
);

export const customerSlice = createSlice({
  name: "musicalItem",
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
    getMusicalItemDataReset: (state) => {
      state.musicalItemData = initialState.musicalItemData;
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
      .addCase(getExistingMusicalItemAsync.pending, (state) => {
        state.musicalItemData.loading = true;
      })
      .addCase(getExistingMusicalItemAsync.fulfilled, (state, action) => {
        state.musicalItemData.loading = false;
        state.musicalItemData.data = action.payload;
        state.musicalItemData.error = null;
      })
      .addCase(getExistingMusicalItemAsync.rejected, (state, action) => {
        state.musicalItemData.loading = false;
        state.musicalItemData.data = null;
        state.musicalItemData.error = action.error;
      });
  },
});

const { actions, reducer } = customerSlice;

export const {
  addNewItemDataReset,
  getAllCategoriesDataReset,
  getAllMusicalItemsDataReset,
  getMusicalItemDataReset
} = actions;

export default reducer;
