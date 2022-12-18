import React from "react";
import styles from "./styles/Schedule.module.css";
import { ScheduleItem } from "./ScheduleItem";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { MystatScheduleEntry } from "mystat-api/dist/types";

type Props = {
  items?: MystatScheduleEntry[];
  isLoading?: boolean;
};

export const Schedule = ({ items, isLoading }: Props) => {
  return (
    <div className={styles.scheduleGrid}>
      <LoadingState visible={isLoading} />
      <EmptyState visible={items?.length === 0 && !isLoading}>
        Нет пар
      </EmptyState>
      {!isLoading &&
        items?.map((item, i) => <ScheduleItem item={item} key={i} />)}
    </div>
  );
};
