import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { IIngredient } from "../types/ingredient";

interface IngredientsState {
  ingredients: IIngredient[];
  status: "none" | "loading" | "success" | "error";
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  status: "none",
  error: null,
};

export const fetchIngredients = createAsyncThunk<IIngredient[]>(
  "ingredients/fetchIngredients",
  async () => {
    const response = await axiosInstance.get("/ingredients");
    return response.data.data;
  },
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IIngredient[]>) => {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<IIngredient[]>) => {
          state.status = "success";
          state.ingredients = action.payload;
        },
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
