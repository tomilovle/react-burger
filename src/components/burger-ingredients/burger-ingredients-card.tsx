import styles from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { IIngredient } from "../../types/ingredient";

interface IIngredientCardProps {
  ingredient: IIngredient;
}
const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  return (
    <>
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={styles.card}
        ref={dragRef}
      >
        <img
          className={styles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </Link>
    </>
  );
};

export default IngredientCard;
