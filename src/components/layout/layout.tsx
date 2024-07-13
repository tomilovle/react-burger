import React, { FC, ReactNode } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>{children}</main>
    </>
  );
};
