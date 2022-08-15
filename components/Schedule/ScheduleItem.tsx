import clsx from "clsx";
import React from "react";
import styles from "./ScheduleItem.module.css";

type Props = {
  // TODO: fix type
  item: any;
};

export const ScheduleItem = ({ item }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.subject}>{item.subject_name}</p>
      <p className={clsx(styles.label, styles.timeLabel)}>
        {item.started_at} - {item.finished_at}
      </p>
      <p className={clsx(styles.label, styles.roomLabel)}>
        Аудитория {item.room_name}
      </p>
      <p className={clsx(styles.label, styles.teacherLabel)}>
        {item.teacher_name}
      </p>
    </div>
  );
};
