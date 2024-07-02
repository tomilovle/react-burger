import AppHeader from "../app-header/app-header";
import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>{children}</main>
    </>
  );
};
