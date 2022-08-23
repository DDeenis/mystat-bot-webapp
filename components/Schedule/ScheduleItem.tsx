import clsx from "clsx";
import React from "react";
import styles from "./styles/ScheduleItem.module.css";

type Props = {
  item: any;
};

export const ScheduleItem = ({ item }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.subject}>{item.subject_name}</p>
      <div className={styles.timeLabelContainer}>
        <p className={clsx(styles.label, styles.timeLabel)}>
          {item.started_at}
        </p>
        <p className={clsx(styles.label, styles.timeLabel)}>
          {item.finished_at}
        </p>
      </div>
      <p className={styles.label}>Аудитория {item.room_name}</p>
      <p className={styles.label}>{item.teacher_name}</p>
    </div>
  );
};
