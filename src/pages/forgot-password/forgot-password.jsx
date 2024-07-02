import React, { useState } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/userSlice";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(forgotPassword(email))
      .then(setEmail(""))
      .then(navigate("/reset-password"));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "E-mail обязателен";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Layout>
      <form className={`${styles.form} mt-30`} onSubmit={sendData}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

        <div className="mb-6">
          <EmailInput
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"e-mail"}
            error={!!errors.email}
            errorText={errors.email}
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
