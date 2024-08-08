import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../types/ingredient";

interface IngredientsDetailState {
  currentIngredient: IIngredient | null;
}
export const initialState: IngredientsDetailState = {
  currentIngredient: null,
};
const ingredientsDetailSlice = createSlice({
  name: "ingredientDetail",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});
export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientsDetailSlice.actions;

export default ingredientsDetailSlice.reducer;
