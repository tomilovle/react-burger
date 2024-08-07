import { useEffect, useMemo } from "react";
import { selectOrders, updateOrders } from "../services/wsOrdersSlice";
import { TModifiedIngredient } from "../types/order";
import { useAppDispatch, useAppSelector } from "./hook";
import { useSelector } from "react-redux";
import { RootState } from "../services/rootReducer";
import { fetchIngredients } from "../services/ingredientsSlice";

const IngredientType = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

export const useModifyOrders = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients,
  );

  const shouldAddPrice = useMemo(() => orders?.some((o) => o.price), [orders]);

  useEffect(() => {
    dispatch(fetchIngredients());
    if (ingredients && orders) {
      const updatedOrders = orders.map((order) => {
        let orderPrice = 0;
        const modifiedIngredients = order.ingredients.reduce(
          (acc: TModifiedIngredient[], ingredientId) => {
            const targetIngredient = ingredients.find(
              (ing) => ing._id === ingredientId,
            );

            if (!targetIngredient) {
              return [
                ...acc,
                { id: ingredientId, img: "", name: "", price: 0, qty: 0 },
              ];
            }

            const isBun = targetIngredient.type === IngredientType.BUN;

            orderPrice += targetIngredient.price;
            if (isBun) {
              orderPrice += targetIngredient.price;
            }

            const foundIngredientInAccIdx = acc.findIndex(
              (o) => o.id === targetIngredient._id,
            );
            if (foundIngredientInAccIdx !== -1) {
              acc[foundIngredientInAccIdx].qty += 1;
              return acc;
            }

            const qty = isBun ? 2 : 1;
            return [
              ...acc,
              {
                id: ingredientId,
                img: targetIngredient.image_mobile,
                name: targetIngredient.name,
                price: targetIngredient.price,
                qty,
              },
            ];
          },
          [],
        );
        return { ...order, price: orderPrice, modifiedIngredients };
      });
      dispatch(updateOrders(updatedOrders));
    }
  }, [shouldAddPrice]);
};
