"use client";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { HomeworkStatus, HomeworkType, type Homework } from "mystat-api";
import { HomeworksList } from "../../components/Homeworks/HomeworksList";
import { LoadingEllipsis } from "../../components/Loaders/Loaders";
import { Multiselect } from "../../components/Multiselect/Multiselect";
import { EmptyState } from "../../components/PageStates/PageStates";
import { Pagination } from "../../components/Pagination/Pagination";
import { homeworkTypes, homeworkVariants } from "../../utils/homework";
import styles from "../../components/Homeworks/HomeworkPage.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const homeworkPageSize = 6;

export default function Homework() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [homework, setHomework] = React.useState<Homework[]>([]);
  const loadingRef = React.useRef<boolean>();
  const router = useRouter();

  const hwStatus = Number(
    searchParams.get("status") ?? HomeworkStatus.Active
  ) as HomeworkStatus;
  const hwType = Number(
    searchParams.get("type") ?? HomeworkType.Homework
  ) as HomeworkType;
  const page = Number(searchParams.get("page") ?? "1");

  const onStatusChange = (newStatus: HomeworkStatus) => {
    router.push(`/homework?status=${newStatus}&type=${hwType}&page=${page}`);
  };

  const onTypeChange = (newType: HomeworkType) => {
    router.push(`/homework?status=${hwStatus}&type=${newType}&page=${page}`);
  };

  const onPageChange = (newPage: number) => {
    console.log("newPage", newPage);

    router.push(`/homework?status=${hwStatus}&type=${hwType}&page=${newPage}`);
    router.prefetch(
      `/homework?status=${hwStatus}&type=${hwType}&page=${newPage + 1}`
    );
  };

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
    router.push(`/homework?status=${hwStatus}&type=${hwType}&page=1`);
    // fetchHomeworks();
  }, [hwStatus, hwType]);

  React.useEffect(() => {
    fetchHomeworks();
  }, [page, hwStatus, hwType]);

  const hasData = homework !== undefined;
  const isDataEmpty = homework?.length === 0;
  const maxPages = homework.length < 6 ? page : page + 5;
  console.log(homework);

  return (
    <>
      <BackButton forcePath="/home" />
      <div className={styles.hwContainer}>
        <div className={styles.element}>
          <Multiselect<HomeworkType>
            variants={homeworkTypes}
            selectedVariant={hwType}
            onSelect={onTypeChange}
            disabled={isLoading}
          />
        </div>
        <div className={styles.element}>
          <Multiselect<HomeworkStatus>
            variants={homeworkVariants}
            selectedVariant={hwStatus}
            onSelect={onStatusChange}
            disabled={isLoading}
          />
        </div>
        {hasData && !isLoading && (
          <HomeworksList
            items={homework}
            status={hwStatus}
            deleteHomework={deleteHomework}
          />
        )}
        {isLoading && (
          <div style={{ margin: "0 auto" }}>
            <LoadingEllipsis />
          </div>
        )}
        <EmptyState visible={isDataEmpty && !isLoading}>
          Нет заданий этого типа
        </EmptyState>
        {!isLoading && !isDataEmpty && (
          <Pagination
            page={page}
            maxPages={maxPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
}
