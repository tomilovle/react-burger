import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
    return (
        <>
            <AppHeader />
            <main className="container">
                <p className="text text_type_main-large mt-40">
                    Соберите бургер
                </p>
                <div className="row">
                    <div className="col-6">
                        <BurgerIngredients />
                    </div>
                    <div className="col-6">
                        <BurgerConstructor />
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
