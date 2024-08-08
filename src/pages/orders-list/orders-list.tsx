import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { useModifyOrders } from "../../hooks/useModifyOrders";
import { selectAccessToken } from "../../services/userSlice";
import { selectOrders, WS_ORDER_ACTIONS } from "../../services/wsOrdersSlice";
import Order from "../order/order";
import styles from "./orders-list.module.css";

const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAccessToken);
  const orders = useAppSelector(selectOrders);

  useModifyOrders();

  useEffect(() => {
    if (token) {
      dispatch({
        type: WS_ORDER_ACTIONS.wsInitWithCustomUrl,
        payload: `wss://norma.nomoreparties.space/orders?token=${token.replace("Bearer ", "")}`,
      });
    }

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
  }, [token]);

  return (
    <div className={styles.history}>
      <div className={styles.root}>
        {orders ? (
          <ul className={`${styles.list} custom-scroll`}>
            {orders
              .slice()
              .reverse()
              .map((item) => (
                <Order key={item._id} data={item} />
              ))}
          </ul>
        ) : (
          <span className="text ">Загрузка...</span>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
