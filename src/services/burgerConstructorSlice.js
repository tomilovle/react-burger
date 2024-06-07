import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        const newIngredient = {
          ...action.payload,
          key: uuidv4(),
        };
        state.constructorIngredients.push(newIngredient);
      }
    },
    setInitialBun: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      }
    },
    deleteIngredient: (state, action) => {
      const key = state.constructorIngredients.findIndex(
        (item) => item.key === action.payload.key,
      );
      state.constructorIngredients.splice(key, 1);
    },
    moveIngredient: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedIngredient] = state.constructorIngredients.splice(
        fromIndex,
        1,
      );
      state.constructorIngredients.splice(toIndex, 0, movedIngredient);
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  setInitialBun,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
