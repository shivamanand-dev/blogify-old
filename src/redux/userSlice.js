import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    openUploadPictureModal: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOpenUploadPictureModal: (state, action) => {
      state.openUploadPictureModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading, setOpenUploadPictureModal } =
  userSlice.actions;

export const userState = (state) => state?.user;

export default userSlice.reducer;
