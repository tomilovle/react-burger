import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./user-data.module.css";
import { sendUserData } from "../../services/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RootState } from "../../services/rootReducer";

export const UserData: FC = () => {
  const { token, userInfo } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onNameClick = () => nameRef.current?.focus();
  const onEmailClick = () => emailRef.current?.focus();
  const onPasswordClick = () => passwordRef.current?.focus();

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setName(value);
    value === userInfo?.name ? setIsDataChanged(false) : setIsDataChanged(true);
  };
  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setEmail(value);
    value === userInfo?.email
      ? setIsDataChanged(false)
      : setIsDataChanged(true);
  };
  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setPassword(value);
    value === password ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // @ts-ignore
    dispatch(sendUserData({ token, name, email, password }));
    setIsDataChanged(false);
  };

  const onCancelEditing = () => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    setPassword("");
    setIsDataChanged(false);
  };

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword("");
    }
  }, [userInfo]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onNameChange}
          icon={"EditIcon"}
          value={name}
          name={"name"}
          error={false}
          onIconClick={onNameClick}
          errorText={"Ошибка"}
          size={"default"}
          ref={nameRef}
        />
      </div>
      <div className="mb-6">
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={onEmailChange}
          icon={"EditIcon"}
          value={email}
          name={"name"}
          error={false}
          onIconClick={onEmailClick}
          errorText={"Ошибка"}
          size={"default"}
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={onPasswordChange}
          icon={"EditIcon"}
          value={password}
          name={"name"}
          error={false}
          onIconClick={onPasswordClick}
          errorText={"Ошибка"}
          size={"default"}
          ref={passwordRef}
        />
      </div>

      {isDataChanged && (
        <div className={styles.buttons}>
          <Button
            onClick={onCancelEditing}
            type="secondary"
            size="medium"
            htmlType={"button"}
          >
            Отмена
          </Button>
          <Button type="primary" size="medium" htmlType={"submit"}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
