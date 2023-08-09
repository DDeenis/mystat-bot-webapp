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
  const [scheduleGroup, setScheduleGroup] = React.useState<
    Record<string, ScheduleEntry[]>
  >({});
  const [scheduleSelected, setScheduleSelected] = React.useState<
    ScheduleEntry[]
  >([]);

  const fetchSchedule = React.cache(async (date: Date) => {
    setIsLoading(true);
    const response = await fetch(`/api/schedule?date=${toDateString(date)}`);
    const result = await response.json();
    if (result) {
      setScheduleGroup(result);
    }
    setIsLoading(false);
  });

  React.useEffect(() => {
    fetchSchedule(date);
  }, []);

  React.useEffect(() => {
    setScheduleSelected(scheduleGroup[toDateString(date)] ?? []);
  }, [date]);

  return (
    <>
      <BackButton />
      <Schedule items={scheduleSelected} isLoading={isLoading} />
      <div className={styles.datepickerContainer}>
        <Calendar
          value={date}
          onChange={setDate}
          onActiveStartDateChange={(prop) => {
            fetchSchedule(prop.activeStartDate).then(() => {
              setDate(prop.activeStartDate);
            });
          }}
          tileClassName={(prop) => {
            if (prop.view !== "month") return null;
            return (scheduleGroup[toDateString(prop.date)]?.length ?? 0) === 0
              ? null
              : styles.dateWithSchedule;
          }}
          locale="ru-RU"
        />
      </div>
    </>
  );
};
