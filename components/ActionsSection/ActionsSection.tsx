import React from "react";
import styles from "./ActionsSection.module.css";

type Props = {
  header: string;
  children: JSX.Element | JSX.Element[];
};

export const ActionsSection = ({ header, children }: Props) => {
  return (
    <section className={styles.mainMenuActions}>
      <div className={styles.mainMenuActions_header}>{header}</div>
      <div className={styles.mainMenuActions_actions}>{children}</div>
    </section>
  );
};
