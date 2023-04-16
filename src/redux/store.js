import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import userReducer from "./user";

export const makeStore = () =>
  configureStore({
    reducer: {
      userReducer: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // ignoredActions: ["setUser"],
          ignoredActionPaths: [],
          // ignoredPaths: ["user.user"],
        },
      }),
  });

export const store = makeStore();

export const StoreWrapper = createWrapper(makeStore, { debug: true });
export default store;
