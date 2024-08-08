import styles from "./orders-feed.module.css";
import { useEffect } from "react";
import {
  selectOrders,
  selectStats,
  WS_ORDER_ACTIONS,
} from "../../services/wsOrdersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Orders from "../orders/orders";
import Stats from "../stats/stats";
import { Layout } from "../../components/layout/layout";
import { useModifyOrders } from "../../hooks/useModifyOrders";

const OrdersFeed = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders) || [];
  const stats = useAppSelector(selectStats);

  useEffect(() => {
    dispatch({ type: WS_ORDER_ACTIONS.wsInit });

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
  }, []);

  useModifyOrders();

  return (
    <Layout>
      <div className={styles.root}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={styles.content}>
          <Orders data={orders} />
          <Stats data={stats} />
        </div>
      </div>
    </Layout>
  );
};

export default OrdersFeed;
