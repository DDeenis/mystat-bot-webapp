import clsx from "clsx";
import { MystatStudentInfo } from "mystat-api/dist/types";
import Image from "next/image";
import React from "react";
import { IconStar } from "../Icons/Icons";
import styles from "./LeadersListElement.module.css";

type Props = {
  student: MystatStudentInfo;
  isActive?: boolean;
};

export const LeadersListElement = ({ student, isActive }: Props) => {
  if (!student || !student.full_name) return null;

  const studentName = student.full_name.split(" ").slice(0, 2).join(" ");

  return (
    <div
      className={clsx(styles.container, {
        [styles.containerActive]: isActive,
      })}
    >
      <div className={styles.position}>{student.position}</div>
      <div className={styles.studentInfo}>
        <div className={styles.studentName}>
          <Image
            src={student.photo_path}
            alt={student.full_name}
            width={25}
            height={25}
            style={{ objectFit: "cover" }}
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
