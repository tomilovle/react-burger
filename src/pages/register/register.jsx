import React, { useState } from "react";
import styles from "./register.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import { useDispatch } from "react-redux";
import { registration } from "../../services/userSlice";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Имя обязательно";
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

    dispatch(registration({ email, name, password }));
  };
  return (
    <Layout>
      <form className={`${styles.form} mt-30`} onSubmit={sendData}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={!!errors.name}
            errorText={errors.name}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <EmailInput
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"e-mail"}
            error={!!errors.email}
            errorText={errors.email}
            size={"default"}
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
          Зарегистрироваться
        </Button>
      </form>

      <div className={`${styles.links} mt-15`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </Layout>
  );
};
