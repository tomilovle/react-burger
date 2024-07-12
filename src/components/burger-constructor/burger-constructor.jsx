import React, { useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  resetConstructor,
} from "../../services/burgerConstructorSlice";
import BurgerCard from "./burger-constructor-card";
import { createOrder } from "../../services/orderSlice";
import styles from "./burger-costructor.module.css";
import OrderDetails from "../details/order-details";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const burgerConstructor = useSelector((state) => state.burgerConstructor);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { userInfo } = useSelector((state) => state.user);
  const orderPrice = useMemo(() => {
    const ingredientsTotal = burgerConstructor.constructorIngredients.reduce(
      (acc, ingredient) => {
        return acc + ingredient.price;
      },
      0,
    );

    return (
      ingredientsTotal +
      (burgerConstructor.bun ? burgerConstructor.bun.price * 2 : 0)
    );
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
    if (userInfo) {
      dispatch(createOrder(burgerConstructor)).then(() => {
        dispatch(resetConstructor());
      });
      openModal();
    } else {
      navigate("/login");
    }
  };

  const orderName = useSelector((state) => state.orderReducer.name);

  const modal = (
    <Modal header={orderName} onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className="middle-container" ref={drop}>
      <div className="pl-8 pt-8 pb-4">
        {burgerConstructor.bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerConstructor.bun.name + "(верх)"}
            price={burgerConstructor.bun.price}
            thumbnail={burgerConstructor.bun.image}
            key={burgerConstructor.bun._id}
          />
        )}
        {!burgerConstructor.bun && (
          <p
            className={`${styles.attention} text text_type_main-small text_color_inactive`}
          >
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
          </p>
        )}
      </div>
      <CustomScroll heightRelativeToParent="40vh">
        {burgerConstructor.constructorIngredients.map((ingredient, index) => {
          return (
            <BurgerCard
              key={ingredient.key}
              ingredient={ingredient}
              currentIndex={index}
            />
          );
        })}
      </CustomScroll>
      <div className="pl-8 pt-4">
        {burgerConstructor.bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerConstructor.bun.name + "(низ)"}
            price={burgerConstructor.bun.price}
            thumbnail={burgerConstructor.bun.image}
            key={burgerConstructor.bun._id}
          />
        )}
      </div>

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
          disabled={!burgerConstructor.bun}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && modal}
    </section>
  );
};

export default BurgerConstructor;
