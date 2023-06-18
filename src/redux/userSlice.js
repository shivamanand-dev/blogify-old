import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = userSlice.actions;

export const userState = (state) => state?.user;

export default userSlice.reducer;
