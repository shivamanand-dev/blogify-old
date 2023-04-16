import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export const userState = (state) => state?.user;

export default userSlice.reducer;
