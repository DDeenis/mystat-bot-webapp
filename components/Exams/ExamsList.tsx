import React from "react";
import styles from "./ExamsList.module.css";
import { ExamsListElement } from "./ExamsListElement";

type Props = {
  exams: any[];
};

export const ExamsList = ({ exams }: Props) => {
  return (
    <div className={styles.container}>
      {exams.length === 0 && <p>Нет экзаменов</p>}
      {exams.map((e) => (
        <ExamsListElement exam={e} key={e.exam_id} />
      ))}
    </div>
  );
};
