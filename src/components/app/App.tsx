import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
    return (
        <>
            <AppHeader />
            <main className="container">
                <p className="text text_type_main-large mt-40">
                    Соберите бургер
                </p>
                <BurgerIngredients />
            </main>
        </>
    );
}

export default App;
