import { MystatStudentInfo } from "mystat-api/dist/types";
import React from "react";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import styles from "./LeadersList.module.css";
import { LeadersListElement } from "./LeadersListElement";

type Props = {
  students?: MystatStudentInfo[];
  studentId?: number;
};

export const LeadersList = ({ students, studentId }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <EmptyState visible={students?.length === 0} />
        {students !== undefined &&
          students.map((s) => (
            <LeadersListElement
              student={s}
              isActive={s.id === studentId}
              key={s.full_name}
            />
          ))}
      </div>
    </>
  );
};
