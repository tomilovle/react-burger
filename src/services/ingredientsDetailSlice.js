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
    clearCurrentIngredient: (state, action) => {
      state.currentIngredient = null;
    },
  },
});
export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientsDetailSlice.actions;

export default ingredientsDetailSlice.reducer;
