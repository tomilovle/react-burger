import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devtools: composeWithDevTools(),
});

export default store;
