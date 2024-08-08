import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { TOrder } from "../types/order";
import { RootState, AppDispatch } from "./store";
import axiosInstance, { handleAxiosResponse } from "../axiosInstance";

export const WS_ORDER_ACTIONS = {
  wsInit: "wsOrder/init",
  wsInitWithCustomUrl: "wsOrder/wsInitWithCustomUrl",
  wsSendMessage: "wsOrder/sendMessage",
  wsClose: "wsOrder/close",
  onOpen: "wsOrder/onOpen",
  onClose: "wsOrder/onClose",
  onError: "wsOrder/onError",
  onMessage: "wsOrder/onMessage",
};

interface IWsOrdersState {
  orders: TOrder[] | undefined;
  total: number | undefined;
  totalToday: number | undefined;
}

export const initialState: IWsOrdersState = {
  orders: undefined,
  total: undefined,
  totalToday: undefined,
};

const wsOrdersSlice = createSlice({
  name: "wsOrder",
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    onMessage: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onClose: () => initialState,
  },
});

export const { updateOrders, onMessage, onClose } = wsOrdersSlice.actions;

const fetchOrders = async (token?: string) => {
  const url = "/orders/all";
  const response = await axiosInstance.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return handleAxiosResponse(response);
};

export const fetchOrdersThunk = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("order/fetchOrders", async (_, thunkAPI) => {
  const token = thunkAPI.getState().user.token;
  const orders = await fetchOrders(token);
  console.log(orders);
  thunkAPI.dispatch(updateOrders(orders.orders));
});

export const selectOrders = (state: RootState) => state.wsOrderReducer.orders;

export const selectOrderById = (id: string | undefined) => (state: RootState) =>
  state.wsOrderReducer.orders?.find((o) => o._id === id);

const selectWsOrders = (state: RootState) => state.wsOrderReducer;

export const selectStats = createSelector(
  [selectWsOrders],
  (wsOrderReducer) => {
    const { total, totalToday } = wsOrderReducer;
    return { total, totalToday };
  },
);

export default wsOrdersSlice.reducer;
