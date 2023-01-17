import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import { loadUser, login } from "../../services/authentication";

const initialState = {
  authData: {
    loading: false,
    data: null,
    error: null,
  },
  loggedUserData: {
    loading: false,
    data: null,
    error: null,
  },
};

// thunk actions
export const loginAsync = createAsyncThunk(
  "authentication/login",
  async (data) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      data.navigate("/dashboard");
    } else {
      localStorage.clear();
      data.navigate("/");
    }
    return response;
  }
);

export const loadUserAsync = createAsyncThunk(
  "authentication/loadUser",
  async (data) => {
    const response = await loadUser();
    if (response.status !== 200) {
      localStorage.clear();
      data.navigate("/");
    }
    return response.data.data;
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authDataReset: (state) => {
      state.authData = initialState.authData;
    },
    loggedUserDataReset: (state) => {
      state.loggedUserData = initialState.loggedUserData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.authData.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.authData.loading = false;
        state.authData.data = action.payload;
        state.authData.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.authData.loading = false;
        state.authData.data = false;
        state.authData.error = action.error;
      });
    builder
      .addCase(loadUserAsync.pending, (state) => {
        state.loggedUserData.loading = true;
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.loggedUserData.loading = false;
        state.loggedUserData.data = action.payload;
        state.loggedUserData.error = null;
      })
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.loggedUserData.loading = false;
        state.loggedUserData.data = null;
        state.loggedUserData.error = action.error;
      });
  },
});

const { actions, reducer } = authenticationSlice;

export const { authDataReset, loggedUserDataReset } = actions;

export default reducer;
