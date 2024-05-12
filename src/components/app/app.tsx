import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
    const [ingredientsData, setIngredientsData] = useState([]);

    useEffect(() => {
        const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
        async function fetchIngredients() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Ошибка при выполнении запроса');
                }
                const data = await response.json();
                setIngredientsData(data.data);
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        }
        fetchIngredients();
    }, []);

    return (
        <>
            <AppHeader />
            <main className={styles.container}>
                <p className="text text_type_main-large mt-40">
                    Соберите бургер
                </p>
                <div className={styles.row}>
                    <div className={styles['col-6']}>
                        <BurgerIngredients data={ingredientsData} />
                    </div>
                    <div className={styles['col-6']}>
                        <BurgerConstructor data={ingredientsData} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
