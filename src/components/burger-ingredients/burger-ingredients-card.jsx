import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const IngredientCard = (ingredient) => {
    ingredient = ingredient.ingredient;
    return (
        <div className={styles.card}>
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
    );
};

IngredientCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
};

export default IngredientCard;
