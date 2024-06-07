import React, { useEffect, useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { CustomScroll } from "react-custom-scroll";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  setInitialBun,
} from "../../services/burgerConstructorSlice";
import BurgerCard from "./burger-constructor-card";
import { createOrder } from "../../services/orderSlice";
import styles from "./burger-costructor.module.css";
import OrderDetails from "../details/order-details";

const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const burgerConstructor = useSelector((state) => state.burgerConstructor);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (ingredients.length > 0) {
      const bunInit = ingredients.find(
        (ingredient) => ingredient.type === "bun",
      );
      if (bunInit) {
        dispatch(setInitialBun(bunInit));
      }
    }
  }, [dispatch, ingredients]);

  const orderPrice = useMemo(() => {
    const ingredientsTotal = burgerConstructor.constructorIngredients.reduce(
      (acc, ingredient) => {
        return acc + ingredient.price;
      },
      0,
    );

    return ingredientsTotal + burgerConstructor.bun.price * 2;
  }, [burgerConstructor]);

  const handleDrop = (droppedItem) => {
    const { id } = droppedItem;
    const index = ingredients.findIndex((item) => item._id === id);
    const newItem = {
      ...ingredients[index],
      key: uuidv4(),
    };
    dispatch(addIngredient(newItem));
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    drop: (item) => handleDrop(item),
  });

  const handleOrder = () => {
    dispatch(createOrder(burgerConstructor));
    openModal();
  };

  const orderName = useSelector((state) => state.orderReducer.name);

  const modal = (
    <Modal header={orderName} onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section ref={drop}>
      <CustomScroll heightRelativeToParent="40vh">
        <div className="pl-8 pt-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerConstructor.bun.name + "(верх)"}
            price={burgerConstructor.bun.price}
            thumbnail={burgerConstructor.bun.image}
            key={burgerConstructor.bun._id}
          />
        </div>
        {burgerConstructor.constructorIngredients.map((ingredient, index) => {
          return (
            <BurgerCard
              key={ingredient.key}
              ingredient={ingredient}
              currentIndex={index}
            />
          );
        })}
        <div className="pl-8 pt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerConstructor.bun.name + "(низ)"}
            price={burgerConstructor.bun.price}
            thumbnail={burgerConstructor.bun.image}
            key={burgerConstructor.bun._id}
          />
        </div>
      </CustomScroll>

      <div className={styles.totalCoast}>
        <div className={styles.coast}>
          <span className="text text_type_digits-medium pr-2">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOrder}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && modal}
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType),
};

export default BurgerConstructor;
