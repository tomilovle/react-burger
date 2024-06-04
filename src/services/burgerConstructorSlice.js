import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.constructorIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (i) => i !== action.payload,
      );
    },
  },
});

export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
