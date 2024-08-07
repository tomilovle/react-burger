import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { socketMiddleware } from "../middleware/socket-middleware";
import { WS_ORDER_ACTIONS } from "./wsOrdersSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(
        "wss://norma.nomoreparties.space/orders/all",
        WS_ORDER_ACTIONS,
      ),
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, any>
>;
