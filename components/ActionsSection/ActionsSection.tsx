import React from "react";
import styles from "./styles.module.css";

type Props = {
  header: string;
  children: React.ReactElement;
};

export const ActionSection = ({ header, children }: Props) => {
  return (
    <section className={styles.mainMenuActions}>
      <div className={styles.mainMenuActions_header}>{header}</div>
      <div className={styles.mainMenuActions_actions}>{children}</div>
    </section>
  );
};
