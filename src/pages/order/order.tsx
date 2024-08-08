import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import { formatDate } from "../../components/feed-card/feed-card";
import { TOrder } from "../../types/order";
import { OrderStatusOutput } from "../order-list/order-list";
import styles from "./order.module.css";

interface IOrderProps {
  data: TOrder;
}

const Order = ({ data }: IOrderProps) => {
  const orderStatus =
    data.status.toUpperCase() as keyof typeof OrderStatusOutput;

  const location = useLocation();

  return (
    <>
      <li className={styles.orderContainer}>
        <NavLink
          className={styles.order}
          to={`${data.number}`}
          state={{ background: location }}
        >
          <p className={styles.header}>
            <span className="text text_type_digits-default">
              #{data.number}
            </span>
            <time className="text text_type_main-default text_color_inactive">
              {formatDate(data.createdAt)}
            </time>
          </p>
          <p className="text text_type_main-medium mb-2">{data.name}</p>
          <p className="text text_type_main-default mb-6">
            {OrderStatusOutput[orderStatus]}
          </p>

          <div className={styles.ingredientsContainer}>
            <ul className={styles.ingredientsList}>
              {data.modifiedIngredients?.slice(0, 5).map((ing, i) => (
                <li
                  className={styles.ingredient}
                  key={`${ing.id}-${data._id}-${i}`}
                >
                  <img
                    className={styles.ingredientImage}
                    src={ing.img}
                    alt="ингредиент"
                  />
                </li>
              ))}
            </ul>
            <p className={styles.priceContainer}>
              <span className="text text_type_digits-default mr-2">
                {data.price}
              </span>
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </NavLink>
      </li>
    </>
  );
};

export default Order;
