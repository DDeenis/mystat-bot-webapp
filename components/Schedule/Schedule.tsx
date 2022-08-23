import React from "react";
import styles from "./styles/Schedule.module.css";
import { ScheduleItem } from "./ScheduleItem";

type Props = {
  items: any[];
};

export const Schedule = ({ items }: Props) => {
  return (
    <div className={styles.scheduleGrid}>
      {items.length === 0 && <p className={styles.noElements}>Нет пар</p>}
      {items.map((item, i) => (
        <ScheduleItem item={item} key={i} />
      ))}
    </div>
  );
};
