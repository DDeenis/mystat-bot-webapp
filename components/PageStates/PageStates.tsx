import React from "react";
import styles from "./PageStates.module.css";

type Props = {
  visible?: boolean;
  children?: string;
};

export const EmptyState = ({ visible, children }: Props) => {
  return visible ? (
    <p className={styles.empty}>{children ?? "Нет данных для отображения"}</p>
  ) : null;
};

export const LoadingState = ({ visible, children }: Props) => {
  return visible ? (
    <p className={styles.empty}>{children ?? "Загрузка..."}</p>
  ) : null;
};
