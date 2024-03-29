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

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const toDateString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

let controller = new AbortController();

export const SchedulePage = ({ defaultDate = new Date() }: Props) => {
  const [date, setDate] = React.useState<Date>(defaultDate);
  const [isLoading, setIsLoading] = React.useState(false);
  const [scheduleGroup, setScheduleGroup] = React.useState<
    Record<string, ScheduleEntry[]>
  >({});
  const [scheduleSelected, setScheduleSelected] = React.useState<
    ScheduleEntry[]
  >([]);

  const fetchSchedule = React.cache(async (date: Date) => {
    setIsLoading(true);
    const response = await fetch(`/api/schedule?date=${toDateString(date)}`, {
      signal: controller.signal,
    });
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
    if (isLoading) return;
    setScheduleSelected(scheduleGroup[toDateString(date)] ?? []);
  }, [date, isLoading]);

  return (
    <>
      <BackButton />
      <Schedule items={scheduleSelected} isLoading={isLoading} />
      <div className={styles.datepickerContainer}>
        <Calendar
          value={date}
          onChange={(value) => setDate(value as Date)}
          onActiveStartDateChange={(prop) => {
            const { activeStartDate } = prop;
            if (activeStartDate) {
              controller.abort();
              controller = new AbortController();
              fetchSchedule(activeStartDate).then(() => {
                setDate(activeStartDate);
              });
            }
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
