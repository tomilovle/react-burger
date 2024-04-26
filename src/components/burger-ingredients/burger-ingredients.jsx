import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './burger-ingredients-card';
import styles from './burger-ingredients.module.css';
import { CustomScroll } from 'react-custom-scroll';
import { ingredientType } from '../../utils/types';
const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <>
            <div className={styles.burger_tabs}>
                <Tab
                    value="bun"
                    active={current === 'bun'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={current === 'sauce'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={current === 'main'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <CustomScroll heightRelativeToParent="60vh">
                <div className={styles.burgerIngredients}>
                    <p className="text text_type_main-medium">Булки</p>
                    <div className={styles.container}>
                        {props.data.map((ingredient) => {
                            if (ingredient.type === 'bun') {
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
                <div className={styles.burgerIngredients}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={styles.container}>
                        {props.data.map((ingredient) => {
                            if (ingredient.type === 'sauce') {
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
                <div className={styles.burgerIngredients}>
                    <p className="text text_type_main-medium">Начинки</p>
                    <div className={styles.container}>
                        {props.data.map((ingredient) => {
                            if (ingredient.type === 'main') {
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
            </CustomScroll>
        </>
    );
};

IngredientCard.propTypes = ingredientType;

export default BurgerIngredients;
