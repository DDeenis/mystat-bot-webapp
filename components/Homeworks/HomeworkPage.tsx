import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";
import React, { useEffect } from "react";
import { homeworkTypes, homeworkVariants } from "../../utils/homework";
import { trpc } from "../../utils/trpc";
import { BackButton } from "../BackButton/BackButton";
import { Multiselect } from "../Multiselect/Multiselect";
import styles from "./HomeworkPage.module.css";
import { HomeworksList } from "./HomeworksList";

type Props = {
  hwStatus: MystatHomeworkStatus;
  hwType: MystatHomeworkType;
  page: number;
  onStatusChange: (val: MystatHomeworkStatus) => void;
  onTypeChange: (val: MystatHomeworkType) => void;
  onPageChange: (val: number) => void;
};

export const HomeworkPage: React.FC<Props> = ({
  hwStatus,
  hwType,
  page,
  onStatusChange,
  onTypeChange,
  onPageChange,
}) => {
  const { data, isLoading, remove } = trpc.useQuery(
    ["mystat.homework", { hwStatus, hwType, page }],
    { keepPreviousData: true }
  );

  useEffect(() => {
    onPageChange(1);
  }, [hwStatus, hwType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className={styles.hwContainer}>
      <BackButton />
      <div className={styles.element}>
        <Multiselect<MystatHomeworkType>
          variants={homeworkTypes}
          selectedVariant={hwType}
          onSelect={onTypeChange}
        />
      </div>
      <div className={styles.element}>
        <Multiselect<MystatHomeworkStatus>
          variants={homeworkVariants}
          selectedVariant={hwStatus}
          onSelect={onStatusChange}
        />
      </div>
      {Boolean(data?.data) && (
        <HomeworksList
          items={data?.data}
          status={hwStatus}
          page={page}
          onPageChange={onPageChange}
        />
      )}
      {isLoading && <p className={styles.empty}>Загрузка...</p>}
      {data?.data?.length === 0 && !isLoading && (
        <p className={styles.empty}>Нет заданий этого типа</p>
      )}
    </div>
  );
};
