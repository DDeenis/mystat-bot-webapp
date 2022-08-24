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
  hwStatus?: MystatHomeworkStatus;
  hwType?: MystatHomeworkType;
  page?: number;
  onStatusChange?: (val: MystatHomeworkStatus) => void;
  onTypeChange?: (val: MystatHomeworkType) => void;
};

export const HomeworkPage: React.FC<Props> = ({
  hwStatus = MystatHomeworkStatus.Active,
  hwType = MystatHomeworkType.Homework,
  page = 1,
  onStatusChange,
  onTypeChange,
}) => {
  const [localizedStatus, setLocalizedStatus] = useState("Текущие");
  const [localizedType, setLocalizedType] = useState("Домашние задания");
  const { data, refetch } = trpc.useQuery([
    "mystat.homework",
    { hwStatus, hwType, page },
  ]);

  useEffect(() => {
    onStatusChange?.(localizedToStatus(localizedStatus));
    onTypeChange?.(localizedToType(localizedType));
  }, [localizedStatus, localizedType]);

  useEffect(() => {
    // refetch
    refetch();
  }, [hwStatus, hwType, page]);

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
        <HomeworksList items={data?.data} status={hwStatus} />
      )}
    </div>
  );
};
