import React from "react";
import styles from "./styles/Schedule.module.css";
import { ScheduleItem } from "./ScheduleItem";

type Props = {
  items: any[];
  isLoading?: boolean;
};

export const Schedule = ({ items, isLoading }: Props) => {
  return (
    <div className={styles.scheduleGrid}>
      {/* TODO: add loader skeleton */}
      {isLoading && <p className={styles.noElements}>Загрузка...</p>}
      {items?.length === 0 && !isLoading && (
        <p className={styles.noElements}>Нет пар</p>
      )}
      {!isLoading &&
        items.map((item, i) => <ScheduleItem item={item} key={i} />)}
    </div>
  );
};
