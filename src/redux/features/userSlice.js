import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  isUserAuth: false,
  role: null,
};

console.log("USER DATA",initialState.userData)

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
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser } = userSlice.actions

export default userSlice.reducer