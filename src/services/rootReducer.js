import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import burgerConstructorReducer from "./burgerConstructorSlice";
import ingredientsDetailReducer from "./ingredientsDetailSlice";
import orderReducer from "./orderSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientsDetail: ingredientsDetailReducer,
  orderReducer: orderReducer,
  user: userReducer,
});
export default rootReducer;
