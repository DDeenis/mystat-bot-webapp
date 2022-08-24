import clsx from "clsx";
import React from "react";
import { InfoCard } from "../InfoCard/InfoCard";
import styles from "./styles/ScheduleItem.module.css";

type Props = {
  item: any;
};

export const ScheduleItem = ({ item }: Props) => {
  return (
    <InfoCard title={item.subject_name}>
      <InfoCard.Row>
        <InfoCard.Cell>
          <p className={styles.timeLabel}>{item.started_at}</p>
        </InfoCard.Cell>
        <InfoCard.Cell>
          <p className={styles.timeLabel}>{item.finished_at}</p>
        </InfoCard.Cell>
      </InfoCard.Row>
      <InfoCard.Element>Аудитория {item.room_name}</InfoCard.Element>
      <InfoCard.Element>{item.teacher_name}</InfoCard.Element>
    </InfoCard>
  );
};
