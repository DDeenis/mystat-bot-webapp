"use client";
import React from "react";
import { BackButton } from "../../../components/BackButton/BackButton";
import { HomeworkStatus, HomeworkType } from "mystat-api";
import { Multiselect } from "../../../components/Multiselect/Multiselect";
import { homeworkTypes, homeworkVariants } from "../../../utils/homework";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../../components/Homeworks/HomeworkPage.module.css";

export default function HomeworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hwStatus = Number(
    searchParams.get("status") ?? HomeworkStatus.Active
  ) as HomeworkStatus;
  const hwType = Number(
    searchParams.get("type") ?? HomeworkType.Homework
  ) as HomeworkType;

  const onStatusChange = (newStatus: HomeworkStatus) => {
    router.push(`/homework/list?status=${newStatus}&type=${hwType}&page=1`);
  };

  const onTypeChange = (newType: HomeworkType) => {
    router.push(`/homework/list?status=${hwStatus}&type=${newType}&page=1`);
  };

  return (
    <>
      <BackButton forcePath="/home" />
      <div className={styles.hwContainer}>
        <div className={styles.element}>
          <Multiselect<HomeworkType>
            variants={homeworkTypes}
            selectedVariant={hwType}
            onSelect={onTypeChange}
          />
        </div>
        <div className={styles.element}>
          <Multiselect<HomeworkStatus>
            variants={homeworkVariants}
            selectedVariant={hwStatus}
            onSelect={onStatusChange}
          />
        </div>
        {children}
      </div>
    </>
  );
}
