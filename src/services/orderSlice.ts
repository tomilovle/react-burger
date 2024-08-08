import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { BurgerConstructor } from "../types/burger";

interface OrderState {
  order: OrderResponse | null;
  number: number;
  name: string;
  status: "none" | "loading" | "success" | "error";
  error: string | null;
}

interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
}

const initialState: OrderState = {
  order: null,
  number: 0,
  name: "",
  status: "none",
  error: null,
};

export const createOrder = createAsyncThunk<OrderResponse, BurgerConstructor>(
  "order/createOrder",
  async (burgerConstructor) => {
    if (!burgerConstructor.bun) {
      throw new Error("Bun is required");
    }
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
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<OrderResponse>) => {
          state.status = "success";
          state.order = action.payload;
          state.name = action.payload.name;
          state.number = action.payload.order.number;
        },
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
