"use client";
import { Homework, HomeworkStatus, HomeworkType } from "mystat-api";
import React, { useRef } from "react";
import { homeworkTypes, homeworkVariants } from "../../utils/homework";
import { Multiselect } from "../Multiselect/Multiselect";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { Pagination } from "../Pagination/Pagination";
import styles from "./HomeworkPage.module.css";
import { HomeworksList } from "./HomeworksList";

export const HomeworkPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [hwStatus, setHwStatus] = React.useState(HomeworkStatus.Active);
  const [hwType, setHwType] = React.useState(HomeworkType.Homework);
  const [isLoading, setIsLoading] = React.useState(false);
  const [homework, setHomework] = React.useState<Homework[]>([]);
  const loadingRef = useRef<boolean>();

  const fetchHomeworks = async () => {
    if (loadingRef.current) return;
    setIsLoading(true);
    loadingRef.current = true;

    const response = await fetch(
      `/api/homework?hwStatus=${hwStatus}&hwType=${hwType}&page=${page}`
    );

    loadingRef.current = false;

    const homeworkList: Homework[] = await response.json();
    setIsLoading(false);

    setHomework(homeworkList ?? []);
  };

  const deleteHw = (obj: { id: number }) => {
    return fetch("/api/homework", {
      body: JSON.stringify(obj),
      method: "DELETE",
    });
  };

  const deleteHomework = (id: number) => {
    deleteHw({ id });
    fetchHomeworks();
  };

  React.useEffect(() => {
    setPage(1);
    fetchHomeworks();
  }, [hwStatus, hwType]);

  React.useEffect(() => {
    fetchHomeworks().then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [page]);

  const hasData = homework !== undefined;
  const isDataEmpty = homework?.length === 0;

  return (
    <div className={styles.hwContainer}>
      <div className={styles.element}>
        <Multiselect<HomeworkType>
          variants={homeworkTypes}
          selectedVariant={hwType}
          onSelect={setHwType}
          disabled={isLoading}
        />
      </div>
      <div className={styles.element}>
        <Multiselect<HomeworkStatus>
          variants={homeworkVariants}
          selectedVariant={hwStatus}
          onSelect={setHwStatus}
          disabled={isLoading}
        />
      </div>
      {hasData && (
        <HomeworksList
          items={homework}
          status={hwStatus}
          deleteHomework={deleteHomework}
        />
      )}
      <LoadingState visible={isLoading} />
      <EmptyState visible={isDataEmpty && !isLoading}>
        Нет заданий этого типа
      </EmptyState>
      {!isLoading && !isDataEmpty && (
        <Pagination page={page} maxPages={30} onPageChange={setPage} />
      )}
    </div>
  );
};
