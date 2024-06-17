import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (burgerConstructor) => {
    const bun = [burgerConstructor.bun._id];
    const ingredients = burgerConstructor.constructorIngredients.map(
      (i) => i._id,
    );
    const ingredientsId = {
      ingredients: bun.concat(ingredients),
    };
    const response = await axiosInstance.post(
      "/orders",
      JSON.stringify(ingredientsId),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  },
);

const initialState = {
  order: null,
  number: 0,
  name: "",
  status: "none",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    removeOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.order = action.payload;
        state.name = action.payload.name;
        state.number = action.payload.order.number;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
