import React from "react";
import { HomeworkStatus, HomeworkType } from "mystat-api";
import { HomeworksList } from "../../../components/Homeworks/HomeworksList";
import { EmptyState } from "../../../components/PageStates/PageStates";
import { getUserApiClient } from "../../../server/actions";
import paginationStyles from "../../../components/Pagination/Pagination.module.css";
import clsx from "clsx";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "Homework list",
};

const homeworkPageSize = 6;
export default async function HomeworkList({ searchParams }: Props) {
  const hwStatus = Number(
    searchParams["status"] ?? HomeworkStatus.Active
  ) as HomeworkStatus;
  const hwType = Number(
    searchParams["type"] ?? HomeworkType.Homework
  ) as HomeworkType;
  const page = Number(searchParams["page"] ?? "1");

  const mystat = await getUserApiClient();

  if (!mystat) {
    throw "Unauthorized";
  }

  const homeworkList =
    (await mystat.getHomeworkList({
      page: page,
      status: hwStatus,
      type: hwType,
    })) ?? [];

  const isDataEmpty = homeworkList?.length === 0;
  const maxPages = homeworkList.length < homeworkPageSize ? page : page + 5;

  return (
    <>
      {!isDataEmpty && <HomeworksList items={homeworkList} status={hwStatus} />}
      <EmptyState visible={isDataEmpty}>Нет заданий этого типа</EmptyState>
      {!isDataEmpty && (
        <Pagination
          page={page}
          status={hwStatus}
          type={hwType}
          hasPrev={page > 1}
          hasNext={homeworkList.length <= maxPages}
        />
      )}
    </>
  );
}

const limit = 6;
const Pagination = ({
  page,
  status,
  type,
  hasPrev,
  hasNext,
}: {
  page: number;
  status: HomeworkStatus;
  type: HomeworkType;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const visiblePages: number[] = [];

  const start = page - Math.floor(limit / 2);
  const safeStart = start > 0 ? start : 1;
  const end = limit + safeStart;

  for (let i = safeStart; i < end; i++) {
    visiblePages.push(i);
  }

  const prevDisabled = !hasPrev;
  const nextDisabled = !hasNext;

  return (
    <div className={paginationStyles.container}>
      <Link
        href={
          prevDisabled
            ? "#"
            : `/homework/list?status=${status}&type=${type}&page=${page - 1}`
        }
        passHref
        aria-disabled={prevDisabled}
      >
        <button
          className={clsx(
            paginationStyles.buttonControl,
            paginationStyles.buttonPrev,
            {
              [paginationStyles.buttonControl_disabled]: prevDisabled,
            }
          )}
        />
      </Link>
      <div className={paginationStyles.pagesContainer}>
        {visiblePages.map((p) => (
          <Link
            href={`/homework/list?status=${status}&type=${type}&page=${p}`}
            passHref
            key={p}
          >
            <button
              className={clsx(paginationStyles.page, {
                [paginationStyles.page_selected]: p === page,
              })}
            >
              {p}
            </button>
          </Link>
        ))}
      </div>
      <Link
        href={
          nextDisabled
            ? "#"
            : `/homework/list?status=${status}&type=${type}&page=${page + 1}`
        }
        passHref
        prefetch={true}
        aria-disabled={nextDisabled}
      >
        <button
          className={clsx(
            paginationStyles.buttonControl,
            paginationStyles.buttonNext,
            {
              [paginationStyles.buttonControl_disabled]: nextDisabled,
            }
          )}
        />
      </Link>
    </div>
  );
};
