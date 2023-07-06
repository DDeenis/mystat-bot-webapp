import { MystatExam } from "mystat-api/dist/types";
import React from "react";
import { EmptyState } from "../PageStates/PageStates";
import styles from "./ExamsList.module.css";
import { ExamsListElement } from "./ExamsListElement";

type Props = {
  exams: MystatExam[];
};

export const ExamsList = ({ exams }: Props) => {
  return (
    <div className={styles.container}>
      <EmptyState visible={exams?.length === 0}>Нет экзаменов</EmptyState>
      {exams && exams.map((e) => <ExamsListElement exam={e} key={e.exam_id} />)}
    </div>
  );
};
