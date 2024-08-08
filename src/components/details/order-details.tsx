import React, { FC } from "react";

import styles from "./details.module.css";
import done from "../../images/done.png";
import { RootState } from "../../services/rootReducer";
import { useAppSelector } from "../../hooks/hook";

const OrderDetails: FC = () => {
  const number = useAppSelector(
    (state: RootState) => state.orderReducer.number,
  );
  const status = useAppSelector(
    (state: RootState) => state.orderReducer.status,
  );
  const error = useAppSelector((state: RootState) => state.orderReducer.error);

  if (status === "loading") {
    return <p className="text text_type_main-medium">Loading...</p>;
  }

  if (status === "error") {
    return <p className="text text_type_main-medium">Error: {error}</p>;
  }

  return (
    <div className={styles.modal} data-cy="order-modal">
      <p className="text text_type_digits-large pt-20">
        {" "}
        {number !== null ? number : "No Order Number"}
      </p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
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
