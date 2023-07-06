"use client";
import {
  MystatHomework,
  MystatHomeworkStatus,
  MystatHomeworkType,
  MystatResponse,
} from "mystat-api/dist/types";
import React, { useRef } from "react";
import { homeworkTypes, homeworkVariants } from "../../utils/homework";
import { Multiselect } from "../Multiselect/Multiselect";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { Pagination } from "../Pagination/Pagination";
import styles from "./HomeworkPage.module.css";
import { HomeworksList } from "./HomeworksList";

export const HomeworkPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [hwStatus, setHwStatus] = React.useState(MystatHomeworkStatus.Active);
  const [hwType, setHwType] = React.useState(MystatHomeworkType.Homework);
  const [isLoading, setIsLoading] = React.useState(false);
  const [homework, setHomework] = React.useState<MystatHomework[]>([]);
  const loadingRef = useRef<boolean>();

  const fetchHomeworks = async (cache = true) => {
    if (loadingRef.current) return;
    setIsLoading(true);
    loadingRef.current = true;

    const response = await fetch(
      `/api/homework?hwStatus=${hwStatus}&hwType=${hwType}&page=${page}`,
      { cache: cache ? "force-cache" : "no-cache" }
    );

    loadingRef.current = false;

    const homeworkList: MystatResponse<MystatHomework[]> =
      await response.json();
    setIsLoading(false);

    setHomework(homeworkList.data ?? []);
  };

  const updateHw = (obj: { id: number; answerText: string }) => {
    return fetch("/api/homework", {
      body: JSON.stringify(obj),
      method: "POST",
    });
  };

  const deleteHw = (obj: { id: number }) => {
    return fetch("/api/homework", {
      body: JSON.stringify(obj),
      method: "DELETE",
    });
  };

  const uploadHomework = (id: number, answerText: string) => {
    updateHw({ id, answerText });
    fetchHomeworks(false);
  };

  const deleteHomework = (id: number) => {
    deleteHw({ id });
    fetchHomeworks(false);
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
        <Multiselect<MystatHomeworkType>
          variants={homeworkTypes}
          selectedVariant={hwType}
          onSelect={setHwType}
        />
      </div>
      <div className={styles.element}>
        <Multiselect<MystatHomeworkStatus>
          variants={homeworkVariants}
          selectedVariant={hwStatus}
          onSelect={setHwStatus}
        />
      </div>
      {hasData && (
        <HomeworksList
          items={homework}
          status={hwStatus}
          uploadHomework={uploadHomework}
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
