import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./userSlice";

const reducers = {
  user: userReducer,
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      // disable warnings to store non-serializable values in the store
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "setUser",
            FLUSH,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            REHYDRATE,
          ],
          ignoredActionPaths: ["payload", "user"],
          ignoredPaths: ["user.userState"],
        },
      }),
  });

export const store = makeStore();
export const StoreWrapper = createWrapper(makeStore, { debug: true });
export const persistor = persistStore(store);