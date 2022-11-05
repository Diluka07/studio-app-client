import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services
import { loadUser, login } from "../../services/authentication";

const initialState = {
  authData: {
    loading: false,
    isAuthenticated: false,
    error: null,
  },
};

// thunk actions
export const loginAsync = createAsyncThunk(
  "authentication/login",
  async (data) => {
    const response = await login({email: data.email, password:data.password});
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      data.navigate("/t1");
    } else {
      localStorage.clear();
      data.navigate("/");
    }
    return response.status;
  }
);

export const loadUserAsync = createAsyncThunk(
  "authentication/login",
  async (data) => {
    const response = await loadUser();
    if (response.status !== 200) {
      localStorage.clear();
      data.navigate("/");
    }
    return response.status;
  }
);
// export const createCompanyAsync = createAsyncThunk(
//   "authentication/postCompany",
//   async () => {
//     const response = await postCompany();

//     return response.data;
//   }
// );
// export const getUserProfileAsync = createAsyncThunk(
//   "authentication/getUserProfile",
//   async (id) => {
//     const response = await getUserProfile(id);

//     return response.data;
//   }
// );

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    createUserReset: (state) => {
      state.authData = initialState.authData;
    },
    // createCompanyReset: (state) => {
    //   state.companyCreateData = initialState.companyCreateData;
    // },
    // getUserProfileReset: (state) => {
    //   state.userProfileData = initialState.userProfileData;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.authData.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.authData.loading = false;
        state.authData.isAuthenticated = action.payload === 200 ? true : false;
        state.authData.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.authData.loading = false;
        state.authData.isAuthenticated = false;
        state.authData.error = action.error;
      });
    // builder
    //   .addCase(createCompanyAsync.pending, (state) => {
    //     state.companyCreateData.loading = true;
    //   })
    //   .addCase(createCompanyAsync.fulfilled, (state, action) => {
    //     state.companyCreateData.loading = false;
    //     state.companyCreateData.data = action.payload;
    //     state.companyCreateData.error = null;
    //   })
    //   .addCase(createCompanyAsync.rejected, (state, action) => {
    //     state.companyCreateData.loading = false;
    //     state.companyCreateData.data = null;
    //     state.companyCreateData.error = action.error;
    //   });
  },
});

const { actions, reducer } = authenticationSlice;

export const { createUserReset } = actions;

export default reducer;
