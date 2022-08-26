import React, { useEffect, useState } from "react";
import styles from "./styles/SchedulePage.module.css";
import Calendar from "react-calendar";
import { trpc } from "../../utils/trpc";
import { Schedule } from "./Schedule";
import { BackButton } from "../BackButton/BackButton";
import "react-calendar/dist/Calendar.css";

type Props = {
  defaultDate?: Date;
};

export const SchedulePage = ({ defaultDate = new Date() }: Props) => {
  const [date, setDate] = useState(defaultDate);
  const { data, isLoading } = trpc.useQuery([
    "mystat.schedule",
    { date: date.toDateString() },
  ]);

  return (
    <>
      <BackButton />
      <Schedule items={data?.data} isLoading={isLoading} />
      <div className={styles.datepickerContainer}>
        <Calendar value={date} onChange={setDate} locale="ru-RU" />
      </div>
    </>
  );
};
