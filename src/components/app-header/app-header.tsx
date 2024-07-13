import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { FC } from "react";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.item} ${styles.text_color_active}`
              : `${styles.item} text_color_inactive`
          }
        >
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </NavLink>
        <div className={`${styles.item} text_color_inactive`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </p>
        </div>
      </div>
      <NavLink to="/" className={styles.logo}>
        <Logo />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${styles.item} ${styles.text_color_active}`
            : `${styles.item} text_color_inactive`
        }
      >
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default  pl-2">Личный кабинет</p>
      </NavLink>
    </header>
  );
};

export default AppHeader;
