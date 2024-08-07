import React, { FC, useState } from "react";
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { resetPassword } from "../../services/userSlice";
import { useAppDispatch } from "../../hooks/hook";

export const ResetPassword: FC = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || !password) {
      return;
    }
    // @ts-ignore
    dispatch(resetPassword({ password, token }));
    setToken("");
    setPassword("");
    navigate("/");
  };

  return (
    <Layout>
      <form onSubmit={sendData} className={`${styles.form} mt-30`}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

        <div className="mb-6">
          <PasswordInput
            placeholder={"Введите новый пароль"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            name={"code"}
            value={token}
            size={"default"}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>

      <div className={`${styles.links} mt-15`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </Layout>
  );
};
