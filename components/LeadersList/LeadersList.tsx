import React from "react";
import styles from "./LeadersList.module.css";
import { LeadersListElement } from "./LeadersListElement";

type Props = {
  students: any[];
  studentId?: number;
};

export const LeadersList = ({ students, studentId }: Props) => {
  return (
    <>
      <div className={styles.container}>
        {students.map((s) => (
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
