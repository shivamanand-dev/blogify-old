import { createSlice } from "@reduxjs/toolkit";

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: null,
  },

  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = blogsSlice.actions;

export const userState = (state) => state?.blogs;

export default blogsSlice.reducer;
