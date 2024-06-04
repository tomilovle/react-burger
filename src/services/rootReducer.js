import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import burgerConstructorReducer from "./burgerConstructorSlice";
import ingredientsDetailReducer from "./ingredientsDetailSlice";
import orderReducer from "./orderSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientsDetail: ingredientsDetailReducer,
  orderReducer: orderReducer,
});
export default rootReducer;
