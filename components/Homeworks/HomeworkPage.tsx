import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";
import React, { useEffect } from "react";
import { homeworkTypes, homeworkVariants } from "../../utils/homework";
import { Multiselect } from "../Multiselect/Multiselect";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { Pagination } from "../Pagination/Pagination";
import styles from "./HomeworkPage.module.css";
import { HomeworksList } from "./HomeworksList";

type Props = {
  homeworks?: any[];
  hwStatus: MystatHomeworkStatus;
  hwType: MystatHomeworkType;
  page: number;
  isLoading?: boolean;
  onStatusChange: (val: MystatHomeworkStatus) => void;
  onTypeChange: (val: MystatHomeworkType) => void;
  onPageChange: (val: number) => void;
};

export const HomeworkPage: React.FC<Props> = ({
  homeworks,
  hwStatus,
  hwType,
  page,
  isLoading,
  onStatusChange,
  onTypeChange,
  onPageChange,
}) => {
  const hasData = homeworks !== undefined;
  const isDataEmpty = homeworks?.length === 0;

  return (
    <div className={styles.hwContainer}>
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
      {hasData && <HomeworksList items={homeworks} status={hwStatus} />}
      <LoadingState visible={isLoading} />
      <EmptyState visible={isDataEmpty && !isLoading}>
        Нет заданий этого типа
      </EmptyState>
      {!isLoading && !isDataEmpty && (
        <Pagination page={page} maxPages={30} onPageChange={onPageChange} />
      )}
    </div>
  );
};
