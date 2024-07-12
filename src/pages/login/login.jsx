import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "E-mail обязателен";
    if (!password) newErrors.password = "Пароль обязателен";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    navigate(-1);
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.from
        ? navigate(location.state.from.pathname)
        : navigate("/");
    }
  }, [userInfo, navigate, location]);
  return (
    <Layout>
      <form className={`${styles.form} mt-30`} onSubmit={sendData}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <div className="mb-6">
          <EmailInput
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"e-mail"}
            size={"default"}
            error={!!errors.email}
            errorText={errors.email}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            onChange={onChangePass}
            value={password}
            name={"password"}
            error={!!errors.password}
            errorText={errors.password}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className={`${styles.links} mt-15`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link className={styles.link} to="/register">
            Зарегистрироваться
          </Link>
        </p>

        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link className={styles.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </Layout>
  );
};
