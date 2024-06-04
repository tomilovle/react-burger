import styles from './burger-costructor.module.css';
import OrderDetails from '../details/order-details';
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CustomScroll } from 'react-custom-scroll';
import Modal from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

const BurgerConstructor = ({ ingredients }) => {
    const { isModalOpen, openModal, closeModal } = useModal();

    const modal = (
        <Modal header="" onClose={closeModal}>
            <OrderDetails />
        </Modal>
    );


    return (
        <section>
            <div className="pl-8 pb-4 pt-8">
                {ingredients.map((item) => {
                    if (item === ingredients[0]) {
                        return (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={item.name + '(верх)'}
                                price={item.price}
                                thumbnail={item.image}
                                key={item._id}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <CustomScroll heightRelativeToParent="40vh">
                <div className={styles['middle-container']}>
                    {ingredients.map((item) => {
                        if (
                            item === ingredients[0] ||
                            item === ingredients[ingredients.length - 1]
                        ) {
                            return null;
                        } else {
                            return (
                                <div key={item._id}>
                                    <span className="pr-2">
                                        <DragIcon type="primary" />
                                    </span>
                                    <ConstructorElement
                                        isLocked={false}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        key={item._id}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </CustomScroll>
            <div className="pl-8 pt-4">
                {ingredients.map((item) => {
                    if (item === ingredients[0]) {
                        return (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={item.name + '(низ)'}
                                price={item.price}
                                thumbnail={item.image}
                                key={item._id}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className={styles.totalCoast}>
                <span className={styles.coast}>
                    <span className="text text_type_digits-medium pr-1">
                        610
                    </span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button
                    onClick={openModal}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button>
                {isModalOpen && modal}
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType),
};

export default BurgerConstructor;
