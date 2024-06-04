import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
