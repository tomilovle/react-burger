import styles from "./ingredients.module.css";
import { Layout } from "../../components/layout/layout";
import IngredientDetails from "../../components/details/ingredient-details";
import { FC } from "react";

export const Ingredients: FC = () => {
  return (
    <Layout>
      <div className={`${styles.container} mt-30`}>
        <p className="text text_type_main-large p-2">Детали ингредиента</p>
        <IngredientDetails />
      </div>
    </Layout>
  );
};
