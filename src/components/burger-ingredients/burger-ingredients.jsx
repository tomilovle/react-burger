import React, { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "./burger-ingredients-card";
import styles from "./burger-ingredients.module.css";
import { CustomScroll } from "react-custom-scroll";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientsSlice";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const status = useSelector((state) => state.ingredients.status);
  const error = useSelector((state) => state.ingredients.error);

  const tabRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleIngredientScroll = () => {
    const tabsYPosition = tabRef.current.getBoundingClientRect().y;
    const bunsYPosition = Math.abs(
      bunRef.current.getBoundingClientRect().y - tabsYPosition,
    );
    const saucesYPosition = Math.abs(
      sauceRef.current.getBoundingClientRect().y - tabsYPosition,
    );
    const mainsYPosition = Math.abs(
      mainRef.current.getBoundingClientRect().y - tabsYPosition,
    );

    const minYPosition = Math.min(
      bunsYPosition,
      saucesYPosition,
      mainsYPosition,
    );

    switch (minYPosition) {
      case saucesYPosition:
        setCurrent("sauce");
        break;
      case mainsYPosition:
        setCurrent("main");
        break;
      default:
        setCurrent("bun");
    }
  };

  useEffect(() => {
    if (status === "none") {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  const handleTabClick = (type, ref) => {
    setCurrent(type);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  if (status === "loading") {
    return <p className="text text_type_main-medium">Loading...</p>;
  }

  if (status === "error") {
    return <p className="text text_type_main-medium">Error: {error}</p>;
  }

  return (
    <>
      <div className={styles.burger_tabs} ref={tabRef}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => handleTabClick("bun", bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleTabClick("sauce", sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleTabClick("main", mainRef)}
        >
          Начинки
        </Tab>
      </div>
      <CustomScroll
        heightRelativeToParent="60vh"
        onScroll={handleIngredientScroll}
      >
        <div className={styles.scrollContainer}>
          <div className={styles.burgerIngredients} ref={bunRef}>
            <p className="text text_type_main-medium">Булки</p>
            <div className={styles.container}>
              {ingredients.map((ingredient) => {
                if (ingredient.type === "bun") {
                  return (
                    <IngredientCard
                      ingredient={ingredient}
                      key={ingredient._id}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <div className={styles.burgerIngredients} ref={sauceRef}>
            <p className="text text_type_main-medium">Соусы</p>
            <div className={styles.container}>
              {ingredients.map((ingredient) => {
                if (ingredient.type === "sauce") {
                  return (
                    <IngredientCard
                      ingredient={ingredient}
                      key={ingredient._id}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <div className={styles.burgerIngredients} ref={mainRef}>
            <p className="text text_type_main-medium">Начинки</p>
            <div className={styles.container}>
              {ingredients.map((ingredient) => {
                if (ingredient.type === "main") {
                  return (
                    <IngredientCard
                      ingredient={ingredient}
                      key={ingredient._id}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </CustomScroll>
    </>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType),
};

export default BurgerIngredients;
