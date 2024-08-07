import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import burgerConstructorReducer from "./burgerConstructorSlice";
import ingredientsDetailReducer from "./ingredientsDetailSlice";
import orderReducer from "./orderSlice";
import userReducer from "./userSlice";
import wsOrdersReducer from "./wsOrdersSlice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientsDetail: ingredientsDetailReducer,
  orderReducer: orderReducer,
  user: userReducer,
  wsOrderReducer: wsOrdersReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
