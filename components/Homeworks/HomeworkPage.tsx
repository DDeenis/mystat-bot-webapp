import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";
import React, { useEffect, useState } from "react";
import {
  hwLocalizedTypes,
  hwLocalizedVariants,
  localizedToStatus,
  localizedToType,
} from "../../utils/homework";
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
  const [localizedStatus, setLocalizedStatus] = useState("Текущие");
  const [localizedType, setLocalizedType] = useState("Домашние задания");
  const { data } = trpc.useQuery(
    ["mystat.homework", { hwStatus, hwType, page }],
    { keepPreviousData: true }
  );

  useEffect(() => {
    onStatusChange(localizedToStatus(localizedStatus));
    onTypeChange(localizedToType(localizedType));
  }, [localizedStatus, localizedType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className={styles.hwContainer}>
      <BackButton />
      <div className={styles.element}>
        <Multiselect
          variants={hwLocalizedTypes}
          selectedVariant={localizedType}
          onSelect={setLocalizedType}
        />
      </div>
      <div className={styles.element}>
        <Multiselect
          variants={hwLocalizedVariants}
          selectedVariant={localizedStatus}
          onSelect={setLocalizedStatus}
        />
      </div>
      {Boolean(data?.data?.length) && (
        <HomeworksList
          items={data?.data}
          status={hwStatus}
          page={page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
