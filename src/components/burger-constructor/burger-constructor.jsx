import { useState } from 'react';
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

const BurgerConstructor = (props) => {
    const data = props.data;

    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const modal = (
        <Modal header="" onClose={handleCloseModal}>
            <OrderDetails />
        </Modal>
    );

    return (
        <section>
            <div className="pl-8 pb-4 pt-8">
                {data.map((item) => {
                    if (item === data[0]) {
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
                    {data.map((item) => {
                        if (
                            item === data[0] ||
                            item === data[data.length - 1]
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
                {data.map((item) => {
                    if (item === data[0]) {
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
                    onClick={handleOpenModal}
                    htmlType="button"
                    type="primary"
                    size="large"
                >
                    Оформить заказ
                </Button>
                {visible && modal}
            </div>
        </section>
    );
};
export default BurgerConstructor;
