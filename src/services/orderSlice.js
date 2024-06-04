import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    removeOrder: (state, action) => {
      state.order = null;
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
