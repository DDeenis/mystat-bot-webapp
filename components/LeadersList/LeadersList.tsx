import React from "react";
import styles from "./LeadersList.module.css";
import { LeadersListElement } from "./LeadersListElement";

type Props = {
  students: any[];
};

export const LeadersList = ({ students }: Props) => {
  return (
    <div className={styles.container}>
      {students.map((s) => (
        <LeadersListElement student={s} key={s.full_name} />
      ))}
    </div>
  );
};
