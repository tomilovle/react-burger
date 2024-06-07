import styles from "./burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../details/ingredient-details";
import { useModal } from "../../hooks/useModal";
import { ingredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "../../services/ingredientsDetailSlice";

const IngredientCard = ({ ingredient }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  const handleOpenIngredient = () => {
    dispatch(setCurrentIngredient(ingredient));
    openModal();
  };
  const handleCloseIngredient = () => {
    closeModal();
    dispatch(clearCurrentIngredient());
  };
  const modal = (
    <Modal header="Ингредиенты" onClose={handleCloseIngredient}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
  return (
    <>
      <div className={styles.card} onClick={handleOpenIngredient} ref={dragRef}>
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
      </div>
      {isModalOpen && modal}
    </>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientType,
};

export default IngredientCard;
