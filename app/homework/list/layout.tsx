"use client";
import React from "react";
import { BackButton } from "../../../components/BackButton/BackButton";
import { HomeworkStatus, HomeworkType } from "mystat-api";
import { Multiselect } from "../../../components/Multiselect/Multiselect";
import {
  HomeworkStatusSlug,
  HomeworkTypeSlug,
  homeworkStatusFromSlug,
  homeworkStatusToSlug,
  homeworkTypeFromSlug,
  homeworkTypeToSlug,
  homeworkTypes,
  homeworkVariants,
} from "../../../utils/homework";
import { useParams, useRouter } from "next/navigation";
import styles from "../../../components/Homeworks/HomeworkPage.module.css";

export default function HomeworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams() as {
    status: HomeworkStatusSlug;
    type: HomeworkTypeSlug;
  };
  const router = useRouter();

  const hwStatus = Number(
    homeworkStatusFromSlug[params["status"]] ?? HomeworkStatus.Active
  ) as HomeworkStatus;
  const hwType = Number(
    homeworkTypeFromSlug[params["type"]] ?? HomeworkType.Homework
  ) as HomeworkType;

  const onStatusChange = (newStatus: HomeworkStatus) => {
    router.push(
      `/homework/list/${homeworkStatusToSlug[newStatus]}/${homeworkTypeToSlug[hwType]}/1`
    );
  };

  const onTypeChange = (newType: HomeworkType) => {
    router.push(
      `/homework/list/${homeworkStatusToSlug[hwStatus]}/${homeworkTypeToSlug[newType]}/1`
    );
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
