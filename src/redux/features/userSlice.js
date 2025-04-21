import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  isUserAuth: false,
  role: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserAuth = true;
      state.userData = action.payload;
      state.role = action.payload?.role || null;
    },
    clearUser: (state) => {
      state.isUserAuth = false;
      state.userData = {};
      state.role = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser, startLoading, stopLoading } = userSlice.actions

export default userSlice.reducer