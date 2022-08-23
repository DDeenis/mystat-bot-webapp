import React, { useEffect, useState } from "react";
import styles from "./styles/SchedulePage.module.css";
import Calendar from "react-calendar";
import { trpc } from "../../utils/trpc";
import { Schedule } from "./Schedule";
import { ScheduleMonth } from "./ScheduleMonth";
import "react-calendar/dist/Calendar.css";

type Props = {
  scheduleFor?: "day" | "month";
  defaultDate?: Date;
};

export const SchedulePage = ({
  scheduleFor = "day",
  defaultDate = new Date(),
}: Props) => {
  const [date, setDate] = useState(defaultDate);
  const { data } = trpc.useQuery(
    ["mystat.schedule", { scheduleFor, date: date.toDateString() }],
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      <div className={styles.datepickerContainer}>
        <p>Выберите дату</p>
        <Calendar value={date} onChange={setDate} locale="ru-RU" />
      </div>
      {scheduleFor === "day" ? (
        <Schedule items={data?.data ?? []} />
      ) : (
        {
          /*        <ScheduleMonth items={data?.data ?? []} /> */
        }
      )}
    </>
  );
};
