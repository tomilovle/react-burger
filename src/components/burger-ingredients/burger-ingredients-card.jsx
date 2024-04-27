import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../details/ingredient-details';
import { useModal } from '../../hooks/useModal';
import { ingredientType } from '../../utils/types';

const IngredientCard = (props) => {
    const { isModalOpen, openModal, closeModal } = useModal();

    const modal = (
        <Modal header="Ингредиенты" onClose={closeModal}>
            <IngredientDetails ingredient={props.ingredient} />
        </Modal>
    );
    return (
        <>
            <div className={styles.card} onClick={openModal}>
                <img
                    className={styles.image}
                    src={props.ingredient.image}
                    alt={props.ingredient.name}
                />
                <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">
                        {props.ingredient.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">
                    {props.ingredient.name}
                </p>
            </div>
            {isModalOpen && modal}
        </>
    );
};

IngredientCard.propTypes = {
    ingredient: ingredientType,
};

export default IngredientCard;
