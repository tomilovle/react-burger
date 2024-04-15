import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one');
    return (
        <>
            <div style={{ display: 'flex', marginTop: 28 }}>
                <Tab
                    value="one"
                    active={current === 'one'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="two"
                    active={current === 'two'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="three"
                    active={current === 'three'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
        </>
    );
};
export default BurgerIngredients;
