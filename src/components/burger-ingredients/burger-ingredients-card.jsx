import styles from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const IngredientCard = ({ ingredient }) => {
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

IngredientCard.propTypes = {
  ingredient: ingredientType,
};

export default IngredientCard;
