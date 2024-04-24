import styles from './details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (ingredient) => {
    ingredient = ingredient.ingredient;
    return (
        <div className={styles.modal}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
            <div className={styles.desc}>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredient.calories}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredient.proteins}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredient.fat}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredient.carbohydrates}
                    </span>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    name: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
};

export default IngredientDetails;
