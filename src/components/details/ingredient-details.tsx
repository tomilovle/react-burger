import React, { FC, useEffect, useState } from "react";
import styles from "./details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "../../services/ingredientsDetailSlice";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { IIngredient } from "../../types/ingredient";
import { RootState } from "../../services/rootReducer";

const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients,
  );
  const currentIngredient = useSelector(
    (state: RootState) => state.ingredientsDetail.currentIngredient,
  );
  const [localCurrentIngredient, setLocalCurrentIngredient] =
    useState<IIngredient | null>(null);

  useEffect(() => {
    if (!ingredients.length) {
      // @ts-ignore
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (id && ingredients.length) {
      const ingredient = ingredients.find(
        (item: IIngredient) => item._id === id,
      );
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
        setLocalCurrentIngredient(ingredient);
      }
    }
    return () => {
      dispatch(clearCurrentIngredient());
    };
  }, [id, ingredients, dispatch]);

  useEffect(() => {
    if (currentIngredient) {
      setLocalCurrentIngredient(currentIngredient);
    }
  }, [currentIngredient]);

  if (!localCurrentIngredient) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.modal}>
      <img
        src={localCurrentIngredient.image_large}
        alt={localCurrentIngredient.name}
      />
      <p className="text text_type_main-medium mt-4" data-cy="ingredient-name">
        {localCurrentIngredient.name}
      </p>
      <div className={styles.desc} data-cy="ingredient-description">
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Калории,ккал</span>
          <span className="text text_type_digits-default">
            {localCurrentIngredient.calories}
          </span>
        </div>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Белки, г</span>
          <span className="text text_type_digits-default">
            {localCurrentIngredient.proteins}
          </span>
        </div>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Жиры, г</span>
          <span className="text text_type_digits-default">
            {localCurrentIngredient.fat}
          </span>
        </div>
        <div className={styles.item}>
          <span className="text text_type_main-default pt-8">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {localCurrentIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
