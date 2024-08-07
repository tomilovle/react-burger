import { IIngredientWithKey } from "./ingredient";

export interface BurgerConstructor {
  bun: IIngredientWithKey | null;
  constructorIngredients: IIngredientWithKey[];
}
