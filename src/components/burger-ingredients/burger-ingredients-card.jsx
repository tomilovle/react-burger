import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../details/ingredient-details';

const IngredientCard = (ingredient) => {
    ingredient = ingredient.ingredient;

    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const modal = (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
    );

    return (
        <>
            <div className={styles.card} onClick={handleOpenModal}>
                <img
                    className={styles.image}
                    src={ingredient.image}
                    alt={ingredient.name}
                />
                <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">
                        {ingredient.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </div>
            {visible && modal}
        </>
    );
};

IngredientCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
};

export default IngredientCard;
