import ingredientsReducer, {
  setIngredients,
  fetchIngredients,
} from "./ingredientsSlice";
import { IIngredient } from "../types/ingredient";
import { initialState } from "./ingredientsSlice";

const MOCK_INGREDIENTS: IIngredient[] = [
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
];

describe("ingredientsSlice тесты", () => {
  it("должен вернуть начальное состояние", () => {
    expect(ingredientsReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("должен установить ингредиенты при setIngredients", () => {
    const previousState = initialState;
    expect(
      ingredientsReducer(previousState, setIngredients(MOCK_INGREDIENTS)),
    ).toEqual({
      ...initialState,
      ingredients: MOCK_INGREDIENTS,
    });
  });

  it('должен установить статус "loading" при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const previousState = {
      ingredients: [],
      status: "none",
      error: null,
    };
    // @ts-ignore
    expect(ingredientsReducer(previousState, action)).toEqual({
      ingredients: [],
      status: "loading",
      error: null,
    });
  });

  it('должен установить ингредиенты и статус "success" при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: MOCK_INGREDIENTS,
    };
    const previousState = {
      ingredients: [],
      status: "loading",
      error: null,
    };
    // @ts-ignore
    expect(ingredientsReducer(previousState, action)).toEqual({
      ingredients: MOCK_INGREDIENTS,
      status: "success",
      error: null,
    });
  });

  it('должен установить статус "error" и сообщение об ошибке при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: "Ошибка сети" },
    };
    const previousState = {
      ingredients: [],
      status: "loading",
      error: null,
    };
    // @ts-ignore
    expect(ingredientsReducer(previousState, action)).toEqual({
      ingredients: [],
      status: "error",
      error: "Ошибка сети",
    });
  });
});
