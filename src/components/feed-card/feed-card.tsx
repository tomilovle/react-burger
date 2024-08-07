import { NavLink, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-card.module.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TOrder } from "../../types/order";

interface IFeedCardProps {
  data: TOrder;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (utc: string): string => {
  const date = dayjs.utc(utc).local();

  const isToday = dayjs().startOf("day").isSame(date, "day");
  if (isToday) return "Сегодня, " + date.format("h:mm");

  const isYesterday = dayjs()
    .subtract(1, "day")
    .startOf("day")
    .isSame(date, "day");
  if (isYesterday) return "Вчера, " + date.format("h:mm");

  return date.format("DD.MM, h:mm");
};

const FeedCard = ({ data }: IFeedCardProps) => {
  const location = useLocation();
  return (
    <li className={styles.cardContainer}>
      <NavLink
        className={styles.card}
        to={`${data.number}`}
        state={{ background: location }}
      >
        <p className={`${styles.header} text text_type_digits-default`}>
          #{data.number}{" "}
          <time className="text text_type_main-default text_color_inactive">
            {formatDate(data.createdAt)}
          </time>
        </p>
        <h2 className={`${styles.title} text text_type_main-medium`}>
          {data.name}
        </h2>
        <div className={styles.priceInfo}>
          {data.modifiedIngredients && (
            <ul className={styles.ingredientsList}>
              {data.modifiedIngredients
                .slice(0, 5)
                .reverse()
                .map((ing, i) => (
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
          )}
          <p className={styles.priceContainer}>
            <span className={`${styles.price} text text_type_digits-default`}>
              {data.price ? data.price : "–"}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default FeedCard;
