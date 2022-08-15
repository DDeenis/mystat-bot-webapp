import React from "react";
import { formatScheduleDate } from "../../utils/dates";
import { ScheduleItem } from "./ScheduleItem";
import styles from "./ScheduleMonth.module.css";

type Props = {
  // TODO: fix type (any)
  items: Map<string, any[]>;
};

export const ScheduleMonth = ({ items }: Props) => {
  return (
    <div className={styles.container}>
      {items.size === 0 && <p className={styles.noElements}>Нет пар</p>}
      {[...items.entries()].map(([date, items]) => (
        <div className={styles.entry} key={date}>
          <p className={styles.scheduleDate}>
            {formatScheduleDate(new Date(date))}
          </p>
          <div className={styles.scheduleGrid}>
            {items.map((item, i) => (
              <ScheduleItem item={item} key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
