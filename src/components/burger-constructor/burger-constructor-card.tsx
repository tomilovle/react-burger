import React, { useRef, FC } from "react";
import { useDispatch } from "react-redux";
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteIngredient,
  moveIngredient,
} from "../../services/burgerConstructorSlice";
import styles from "./burger-costructor.module.css";
import { IIngredientWithKey } from "../../types/ingredient";
import {
  DragCollectedProps,
  DraggedItem,
  DropCollectedProps,
} from "../../types/dnd";

interface IBurgerCardProps {
  ingredient: IIngredientWithKey;
  currentIndex: number;
}

const BurgerCard: FC<IBurgerCardProps> = ({ ingredient, currentIndex }) => {
  const dispatch = useDispatch();
  const ingredientRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteIngredient = (ingredient: IIngredientWithKey) => {
    dispatch(deleteIngredient(ingredient));
  };

  const [, connectDrop] = useDrop<DraggedItem, void, DropCollectedProps>({
    accept: "sorting",
    collect: (monitor: DropTargetMonitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (draggedItem: DraggedItem, monitor: DropTargetMonitor) => {
      if (!ingredientRef.current) return;

      const fromIndex = draggedItem.index;
      const toIndex = currentIndex;

      if (fromIndex === toIndex) return;

      const boundingRect = ingredientRef.current.getBoundingClientRect();
      const middle = (boundingRect.bottom - boundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const client = clientOffset!.y - boundingRect.top;

      if (fromIndex < toIndex && client < middle) return;
      if (fromIndex > toIndex && client > middle) return;

      dispatch(moveIngredient({ fromIndex, toIndex }));
      draggedItem.index = toIndex;
    },
  });

  const [, connectDrag] = useDrag<DraggedItem, void, DragCollectedProps>({
    type: "sorting",
    item: { index: currentIndex },
    collect: (monitor: DragSourceMonitor) => ({
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

export default BurgerCard;
