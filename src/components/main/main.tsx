import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Layout } from "../layout/layout";
import { FC } from "react";

export const Main: FC = () => {
  return (
    <Layout>
      <p className="text text_type_main-large mt-40">Соберите бургер</p>
      <div className={styles.row}>
        <div className={styles["col-6"]}>
          <BurgerIngredients />
        </div>
        <div className={styles["col-6"]}>
          <BurgerConstructor />
        </div>
      </div>
    </Layout>
  );
};
