import styles from './details.module.css';
import { ingredientType } from '../../utils/types';
const IngredientDetails = (props) => {
    return (
        <div className={styles.modal}>
            <img
                src={props.ingredient.image_large}
                alt={props.ingredient.name}
            />
            <p className="text text_type_main-medium mt-4">
                {props.ingredient.name}
            </p>
            <div className={styles.desc}>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default">
                        {props.ingredient.calories}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default">
                        {props.ingredient.proteins}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default">
                        {props.ingredient.fat}
                    </span>
                </div>
                <div className={styles.item}>
                    <span className="text text_type_main-default pt-8">
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default">
                        {props.ingredient.carbohydrates}
                    </span>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: ingredientType,
};

export default IngredientDetails;
