import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredientWithKey } from "../types/ingredient";
import { BurgerConstructor } from "../types/burger";

export const initialState: BurgerConstructor = {
  bun: null,
  constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IIngredientWithKey>) => {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        const newIngredient = {
          ...action.payload,
        };
        state.constructorIngredients.push(newIngredient);
      }
    },
    deleteIngredient: (state, action: PayloadAction<{ key: string }>) => {
      const key = state.constructorIngredients.findIndex(
        (item) => item.key === action.payload.key,
      );
      state.constructorIngredients.splice(key, 1);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedIngredient] = state.constructorIngredients.splice(
        fromIndex,
        1,
      );
      state.constructorIngredients.splice(toIndex, 0, movedIngredient);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.constructorIngredients = [];
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  resetConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
