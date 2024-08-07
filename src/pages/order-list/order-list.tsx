import React, { useEffect } from "react";
import styles from "./order-list.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  fetchOrdersThunk,
  WS_ORDER_ACTIONS,
} from "../../services/wsOrdersSlice";
import { useModifyOrders } from "../../hooks/useModifyOrders";
import { formatDate } from "../../components/feed-card/feed-card";
import { selectAccessToken } from "../../services/userSlice";

interface IOrderDetails {
  style?: React.CSSProperties;
}

export const OrderReadyStatus = {
  PENDING: "pending",
  DONE: "done",
};

export const OrderStatusOutput = {
  PENDING: "Готовится",
  DONE: "Выполнен",
};

const OrderList = ({ style }: IOrderDetails) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { orders } = useAppSelector((state) => state.wsOrderReducer);
  // const token = useAppSelector(selectAccessToken);

  const ordersFromSockets = orders?.find((o) => String(o.number) === id);

  useEffect(() => {
    if (!ordersFromSockets) {
      dispatch(fetchOrdersThunk());
    }
  }, [ordersFromSockets]);

  // useEffect(() => {
  //   const currentPath = window.location.pathname.split("/")[1];
  //   console.log(currentPath);
  //   switch (currentPath) {
  //     case "feed":
  //       if (!ordersFromSockets) {
  //         dispatch(fetchOrdersThunk());
  //       }
  //       break;
  //     case "profile":
  //       if (!ordersFromSockets) {
  //         dispatch({
  //           type: WS_ORDER_ACTIONS.wsInitWithCustomUrl,
  //           payload: `wss://norma.nomoreparties.space/orders?token=${token.replace("Bearer ", "")}`,
  //         });
  //       }
  //       return () => {
  //         dispatch({ type: WS_ORDER_ACTIONS.wsClose });
  //       };
  //       break;
  //     default:
  //       console.log(`Error`);
  //   }
  // }, [ordersFromSockets]);

  // useEffect(() => {
  //   if (!ordersFromSockets) {
  //     dispatch(fetchOrdersThunk());
  //     dispatch({
  //       type: WS_ORDER_ACTIONS.wsInitWithCustomUrl,
  //       payload: `wss://norma.nomoreparties.space/orders?token=${token.replace("Bearer ", "")}`,
  //     });
  //   }
  //   return () => {
  //     dispatch({ type: WS_ORDER_ACTIONS.wsClose });
  //   };
  // }, [ordersFromSockets]);

  useModifyOrders();

  if (!ordersFromSockets) {
    return null;
  }

  const orderStatus =
    ordersFromSockets.status.toUpperCase() as keyof typeof OrderStatusOutput;

  return (
    <div style={style} className={styles.root}>
      <p
        className="text text_type_digits-default mb-10"
        style={{ textAlign: "start" }}
      >
        #{ordersFromSockets.number}
      </p>

      <h1 className="text text_type_main-medium mb-3">
        {ordersFromSockets.name}
      </h1>

      <p className="text text_type_main-default mb-15">
        {OrderStatusOutput[orderStatus]}
      </p>

      <p className="text text_type_main-medium mb-6">Состав:</p>

      <ul className={`${styles.list} custom-scroll mb-10`}>
        {ordersFromSockets.modifiedIngredients?.map((ing, i) => (
          <li key={ing.id} className={styles.ingredient}>
            <div
              style={{ margin: 0 }}
              className={styles.ingredient}
              key={`${ing.id}-${ordersFromSockets._id}-${i}`}
            >
              <img
                className={styles.ingredientImage}
                src={ing.img}
                alt="ингредиент"
              />
            </div>

            <p
              className={`${styles.title} text text_type_main-default ml-4 mr-4`}
            >
              {ing.name}
            </p>

            <p className={styles.priceContainer}>
              <span className="text text_type_main-default mr-2">
                {ing.qty} x {ing.price}
              </span>{" "}
              <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>

      <div className={styles.info}>
        <time className="text text_type_main-default text_color_inactive">
          {formatDate(ordersFromSockets.createdAt)}
        </time>

        <div style={{ marginLeft: "auto" }} className={styles.priceContainer}>
          <span className="text text_type_main-default mr-2">
            {ordersFromSockets.price ? ordersFromSockets.price : "–"}
          </span>{" "}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
