import styles from './details.module.css';

import done from '../../images/done.png';
const OrderDetails = () => {
    return (
        <div className={styles.modal}>
            <p className="text text_type_digits-large pt-20">034536</p>
            <p className="text text_type_main-medium pt-8">
                идентификатор заказа
            </p>
            <img src={done} alt="done" className=" pt-15" />
            <p className="text text_type_main-small pt-15">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive  pt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;
