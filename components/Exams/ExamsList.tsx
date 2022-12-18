import { MystatExam } from "mystat-api/dist/types";
import React from "react";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import styles from "./ExamsList.module.css";
import { ExamsListElement } from "./ExamsListElement";

type Props = {
  exams?: MystatExam[];
  isLoading?: boolean;
};

export const ExamsList = ({ exams, isLoading }: Props) => {
  return (
    <div className={styles.container}>
      <LoadingState visible={isLoading} />
      <EmptyState visible={exams?.length === 0}>Нет экзаменов</EmptyState>
      {exams && exams.map((e) => <ExamsListElement exam={e} key={e.exam_id} />)}
    </div>
  );
};
