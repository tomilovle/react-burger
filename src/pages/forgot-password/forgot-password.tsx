import React, { FC, useState } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { forgotPassword } from "../../services/userSlice";
import { useAppDispatch } from "../../hooks/hook";

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(forgotPassword(email)).then(() => {
      setEmail("");
      navigate("/reset-password");
    });
  };

  return (
    <Layout>
      <form className={`${styles.form} mt-30`} onSubmit={sendData}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

        <div className="mb-6">
          <EmailInput
            placeholder={"Укажите e-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"e-mail"}
            size={"default"}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
