import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const IngredientCard = (props) => {
    return (
        <div className={styles.card}>
            <img className={styles.image} src={props.image} alt={props.name} />
            <div className={styles.price}>
                <p className="text text_type_digits-default pr-2">
                    {props.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{props.name}</p>
        </div>
    );
};

IngredientCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
};

export default IngredientCard;
