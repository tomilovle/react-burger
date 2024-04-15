import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';
import IngredientCard from './burger-ingredients-card';
import styles from './burger-ingredients.module.css';
import { CustomScroll } from 'react-custom-scroll';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <div>
            <div style={{ display: 'flex', marginTop: 28 }}>
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
            <CustomScroll heightRelativeToParent="70vh">
                <div className={styles.burgerIngredients}>
                    <p className="text text_type_main-medium">Булки</p>
                    <div className={styles.container}>
                        {data.map((item) => {
                            if (item.type === 'bun') {
                                return (
                                    <IngredientCard
                                        image={item.image_large}
                                        price={item.price}
                                        name={item.name}
                                        key={item._id}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
                <div style={{ marginTop: 40 }}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <div className={styles.container}>
                        {data.map((item) => {
                            if (item.type === 'sauce') {
                                return (
                                    <IngredientCard
                                        image={item.image_large}
                                        price={item.price}
                                        name={item.name}
                                        key={item._id}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
                <div style={{ marginTop: 40 }}>
                    <p className="text text_type_main-medium">Начинки</p>
                    <div className={styles.container}>
                        {data.map((item) => {
                            if (item.type === 'main') {
                                return (
                                    <IngredientCard
                                        image={item.image_large}
                                        price={item.price}
                                        name={item.name}
                                        key={item._id}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            </CustomScroll>
        </div>
    );
};
export default BurgerIngredients;
