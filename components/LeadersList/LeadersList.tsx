import { StudentInfo } from "mystat-api";
import React from "react";
import { EmptyState } from "../PageStates/PageStates";
import styles from "./LeadersList.module.css";
import { LeadersListElement } from "./LeadersListElement";

type Props = {
  students?: StudentInfo[];
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
