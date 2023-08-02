"use client";
import React from "react";
import styles from "./styles/SchedulePage.module.css";
import Calendar from "react-calendar";
import { Schedule } from "./Schedule";
import { BackButton } from "../BackButton/BackButton";
import { ScheduleEntry } from "mystat-api";
import "react-calendar/dist/Calendar.css";

type Props = {
  defaultDate?: Date;
};

const toDateString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const SchedulePage = ({ defaultDate = new Date() }: Props) => {
  const [date, setDate] = React.useState(defaultDate);
  const [isLoading, setIsLoading] = React.useState(false);
  const [schedule, setSchedule] = React.useState<ScheduleEntry[]>([]);

  const fetchSchedule = React.cache(async () => {
    setIsLoading(true);
    const response = await fetch(`/api/schedule?date=${toDateString(date)}`);
    const result: ScheduleEntry[] = await response.json();
    if (result) {
      setSchedule(result);
    }
    setIsLoading(false);
  });

  React.useEffect(() => {
    fetchSchedule();
  }, [date]);

  return (
    <>
      <BackButton />
      <Schedule items={schedule} isLoading={isLoading} />
      <div className={styles.datepickerContainer}>
        <Calendar value={date} onChange={setDate} locale="ru-RU" />
      </div>
    </>
  );
};
