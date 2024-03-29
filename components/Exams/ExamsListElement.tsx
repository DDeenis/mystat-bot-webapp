import clsx from "clsx";
import { Exam } from "mystat-api";
import React from "react";
import { formatExamDate } from "../../utils/dates";
import styles from "./ExamsListElement.module.css";

type Props = {
  exam: Exam;
};

export const ExamsListElement = ({ exam }: Props) => {
  const mark = exam.mark ?? 0;

  return (
    <div className={styles.container}>
      <div className={clsx(styles.section, styles.dateSection)}>
        {formatExamDate(exam.date)}
      </div>
      <div className={styles.mainSection}>
        <span className={styles.spec}>{exam.spec}</span>
        <span className={styles.teacher}>{exam.teacher}</span>
      </div>
      <div
        className={clsx(styles.section, styles.markSection, {
          [styles.markHigh]: mark >= 9,
          [styles.markMedium]: mark <= 8 && mark >= 6,
          [styles.markLow]: mark <= 5,
          [styles.markNone]: mark === 0,
        })}
      >
        {exam.mark > 0 ? exam.mark : "?"}
      </div>
    </div>
  );
};
