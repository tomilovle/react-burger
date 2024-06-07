import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteIngredient,
  moveIngredient,
} from "../../services/burgerConstructorSlice";
import { ingredientType } from "../../utils/types";
import styles from "./burger-costructor.module.css";

const BurgerCard = ({ ingredient, currentIndex }) => {
  const dispatch = useDispatch();
  const ingredientRef = useRef(null);

  const handleDeleteIngredient = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
  };

  const [{ handlerId }, connectDrop] = useDrop({
    accept: "sorting",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (draggedItem, monitor) => {
      if (!ingredientRef.current) return;

      const fromIndex = draggedItem.index;
      const toIndex = currentIndex;

      if (fromIndex === toIndex) return;

      const boundingRect = ingredientRef.current.getBoundingClientRect();
      const middle = (boundingRect.bottom - boundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const client = clientOffset.y - boundingRect.top;

      if (fromIndex < toIndex && client < middle) return;
      if (fromIndex > toIndex && client > middle) return;

      dispatch(moveIngredient({ fromIndex, toIndex }));
      draggedItem.index = toIndex;
    },
  });

  const [{ isDragging }, connectDrag] = useDrag({
    type: "sorting",
    item: { index: currentIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  connectDrag(connectDrop(ingredientRef));

  return (
    <div
      className={`pt-4 ${styles.card}`}
      key={ingredient._id}
      ref={ingredientRef}
      draggable="true"
    >
      <span className="pr-2">
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDeleteIngredient(ingredient)}
      />
    </div>
  );
};

BurgerCard.propTypes = {
  ingredient: ingredientType,
};

export default BurgerCard;
