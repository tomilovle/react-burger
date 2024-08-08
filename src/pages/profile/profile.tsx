import styles from "./profile.module.css";
import { NavLink, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/layout/layout";
import { UserData } from "../../components/user-data/user-data";
import { logout } from "../../services/userSlice";
import { FC } from "react";
import OrdersList from "../orders-list/orders-list";

const Profile: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    // @ts-ignore
    dispatch(logout(refreshToken));
  };

  return (
    <Layout>
      <div className={styles.row}>
        <div className={styles["col-4"]}>
          <nav className={styles.navigation}>
            <ul className={`${styles.list}`}>
              <li className={styles.list_item}>
                <NavLink
                  className={({ isActive }) =>
                    isActive || window.location.pathname === "/profile"
                      ? `${styles.link_active} text text_type_main-medium`
                      : `${styles.link} text text_type_main-medium`
                  }
                  to="user"
                >
                  Профиль
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link_active} text text_type_main-medium`
                      : `${styles.link} text text_type_main-medium`
                  }
                  to="orders"
                >
                  История заказов
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.link_active} text text_type_main-medium`
                      : `${styles.link} text text_type_main-medium`
                  }
                  to="/login"
                  onClick={handleLogout}
                >
                  Выход
                </NavLink>
              </li>
            </ul>
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </nav>
        </div>
        <div className={styles["col-8"]}>
          <Routes>
            <Route path="user" element={<UserData />} />
            <Route index element={<UserData />} />
            <Route path="orders" element={<OrdersList />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
