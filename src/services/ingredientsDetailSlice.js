import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIngredient: null,
};
const ingredientsDetailSlice = createSlice({
  name: "ingredientDetail",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredients: (state, action) => {
      state.currentIngredient = null;
    },
  },
});
export const { setCurrentIngredient, clearCurrentIngredients } =
  ingredientsDetailSlice.actions;

export default ingredientsDetailSlice.reducer;
