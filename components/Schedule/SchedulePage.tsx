"use client";
import React, { useEffect } from "react";
import styles from "./styles/SchedulePage.module.css";
import Calendar from "react-calendar";
import { Schedule } from "./Schedule";
import { BackButton } from "../BackButton/BackButton";
import { MystatResponse, MystatScheduleEntry } from "mystat-api/dist/types";
import "react-calendar/dist/Calendar.css";

type Props = {
  defaultDate?: Date;
};

const toDateString = (date: Date) => {
  return `${date.getFullYear()}-${date
    .getMonth()
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const SchedulePage = ({ defaultDate = new Date() }: Props) => {
  const [date, setDate] = React.useState(defaultDate);
  const [isLoading, setIsLoading] = React.useState(false);
  const [schedule, setSchedule] = React.useState<MystatScheduleEntry[]>([]);

  const fetchSchedule = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/schedule?date=${toDateString(date)}`, {
      cache: "force-cache",
    });
    const result: MystatResponse<MystatScheduleEntry[]> = await response.json();
    if (result.success) {
      setSchedule(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
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
