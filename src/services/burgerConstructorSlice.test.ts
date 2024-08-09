import reducer, {
  initialState,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  resetConstructor,
} from "./burgerConstructorSlice";

const MOCK_INGREDIENTS = [
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
  {
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
  },
  {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733ca",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
];

describe("burgerConstructorSlice", () => {
  it("should return the initial state", () => {
    // @ts-ignore
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addIngredient for bun", () => {
    const bun = { ...MOCK_INGREDIENTS[0], key: "1" };
    const previousState = initialState;
    expect(reducer(previousState, addIngredient(bun))).toEqual({
      ...initialState,
      bun,
    });
  });

  it("should handle addIngredient for non-bun", () => {
    const ingredient = { ...MOCK_INGREDIENTS[1], key: "2" };
    const previousState = initialState;
    expect(reducer(previousState, addIngredient(ingredient))).toEqual({
      ...initialState,
      constructorIngredients: [ingredient],
    });
  });

  it("should handle deleteIngredient", () => {
    const ingredient = { ...MOCK_INGREDIENTS[1], key: "2" };
    const previousState = {
      bun: null,
      constructorIngredients: [ingredient],
    };
    expect(reducer(previousState, deleteIngredient({ key: "2" }))).toEqual(
      initialState,
    );
  });

  it("should handle moveIngredient", () => {
    const ingredient1 = { ...MOCK_INGREDIENTS[1], key: "1" };
    const ingredient2 = { ...MOCK_INGREDIENTS[2], key: "2" };
    const previousState = {
      bun: null,
      constructorIngredients: [ingredient1, ingredient2],
    };
    expect(
      reducer(previousState, moveIngredient({ fromIndex: 0, toIndex: 1 })),
    ).toEqual({
      bun: null,
      constructorIngredients: [ingredient2, ingredient1],
    });
  });

  it("should handle resetConstructor", () => {
    const bun = { ...MOCK_INGREDIENTS[0], key: "1" };
    const ingredient = { ...MOCK_INGREDIENTS[1], key: "2" };
    const previousState = {
      bun,
      constructorIngredients: [ingredient],
    };
    expect(reducer(previousState, resetConstructor())).toEqual(initialState);
  });
});
