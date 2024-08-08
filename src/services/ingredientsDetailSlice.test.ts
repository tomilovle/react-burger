import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "./ingredientsDetailSlice";
import { IIngredient } from "../types/ingredient";

const MOCK_INGREDIENT = {
  _id: "60d3b41abdacab0026a733c8",
  name: "Филе Люминесцентного тетраодонтимформа",
  type: "main",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  __v: 0,
};

interface IngredientsDetailState {
  currentIngredient: IIngredient | null;
}

const initialState: IngredientsDetailState = {
  currentIngredient: null,
};

describe("ingredientsDetailSlice", () => {
  it("should return the initial state", () => {
    // @ts-ignore
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle setCurrentIngredient", () => {
    const previousState = initialState;
    expect(
      reducer(previousState, setCurrentIngredient(MOCK_INGREDIENT)),
    ).toEqual({
      currentIngredient: MOCK_INGREDIENT,
    });
  });

  it("should handle clearCurrentIngredient", () => {
    const previousState = {
      currentIngredient: MOCK_INGREDIENT,
    };
    expect(reducer(previousState, clearCurrentIngredient())).toEqual({
      currentIngredient: null,
    });
  });
});
