import React, { useEffect } from "react";
import styles from "./details.module.css";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "../../services/ingredientsDetailSlice";

const IngredientDetails = ({ ingredient }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredient) {
      dispatch(setCurrentIngredient(ingredient));
    }
    return () => {
      dispatch(clearCurrentIngredient());
    };
  }, [ingredient, dispatch]);

  const currentIngredient = useSelector(
    (state) => state.ingredientsDetail.currentIngredient,
  );

  if (!currentIngredient) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <p className="text text_type_main-medium mt-4">
        {currentIngredient.name}
      </p>
      <div className={styles.desc}>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Калории,ккал</span>
          <span className="text text_type_digits-default">
            {currentIngredient.calories}
          </span>
        </div>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Белки, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient.proteins}
          </span>
        </div>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Жиры, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient.fat}
          </span>
        </div>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {currentIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType,
};

export default IngredientDetails;
