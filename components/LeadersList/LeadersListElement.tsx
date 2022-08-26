import Image from "next/image";
import React from "react";
import { IconStar } from "../Icons/Icons";
import styles from "./LeadersListElement.module.css";

type Props = {
  student: any;
};

export const LeadersListElement = ({ student }: Props) => {
  const studentName = student.full_name.split(" ").slice(0, 2).join(" ");

  return (
    <div className={styles.container}>
      <div className={styles.position}>{student.position}</div>
      <div className={styles.studentInfo}>
        <div className={styles.studentName}>
          <Image
            src={student.photo_path}
            alt={student.full_name}
            width={25}
            height={25}
            objectFit={"cover"}
            className={styles.avatar}
            loading={"lazy"}
            unoptimized
          />
          <p className={styles.name}>{studentName}</p>
        </div>
        <div className={styles.pointsInfo}>
          <div className={styles.icon}>
            <IconStar />
          </div>
          <p className={styles.amount}>{student.amount}</p>
        </div>
      </div>
    </div>
  );
};
