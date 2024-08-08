export type TModifiedIngredient = {
  id: string;
  img: string;
  name: string;
  price: number;
  qty: number;
};

export type TOrder = {
  _id: string;
  status: string | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];

  price?: number;
  modifiedIngredients?: TModifiedIngredient[];
};
