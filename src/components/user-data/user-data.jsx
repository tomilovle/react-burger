import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./user-data.module.css";
import { sendUserData } from "../../services/userSlice";

export const UserData = () => {
  const { token, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onNameClick = () => nameRef.current.focus();
  const onEmailClick = () => emailRef.current.focus();
  const onPasswordClick = () => passwordRef.current.focus();

  const onNameChange = (evt) => {
    const value = evt.target.value;
    setName(value);
    value === userInfo.name ? setIsDataChanged(false) : setIsDataChanged(true);
  };
  const onEmailChange = (evt) => {
    const value = evt.target.value;
    setEmail(value);
    value === userInfo.email ? setIsDataChanged(false) : setIsDataChanged(true);
  };
  const onPasswordChange = (evt) => {
    const value = evt.target.value;
    setPassword(value);
    value === password ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(sendUserData({ token, name, email, password }));
    setIsDataChanged(false);
  };

  const onCancelEditing = (evt) => {
    evt.preventDefault();
    setName(userInfo.name);
    setEmail(userInfo.email);
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
          <Button onClick={onCancelEditing} type="secondary" size="medium">
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
