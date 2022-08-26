import React from "react";
import { leadersVariants, LeadersVariantsType } from "../../utils/leaders";
import { Multiselect } from "../Multiselect/Multiselect";
import styles from "./LeadersList.module.css";
import { LeadersListElement } from "./LeadersListElement";

type Props = {
  students: any[];
  listFor: LeadersVariantsType;
  setListFor: (val: LeadersVariantsType) => void;
};

export const LeadersList = ({ students, listFor, setListFor }: Props) => {
  return (
    <>
      <Multiselect
        variants={leadersVariants}
        selectedVariant={listFor}
        onSelect={setListFor}
        variantsAsTabs
      />
      <div className={styles.container}>
        {students.map((s) => (
          <LeadersListElement student={s} key={s.full_name} />
        ))}
      </div>
    </>
  );
};
