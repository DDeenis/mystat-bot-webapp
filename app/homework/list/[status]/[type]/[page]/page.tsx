import React from "react";
import { HomeworkStatus, HomeworkType } from "mystat-api";
import { HomeworksList } from "../../../../../../components/Homeworks/HomeworksList";
import { EmptyState } from "../../../../../../components/PageStates/PageStates";
import { getUserApiClient } from "../../../../../../server/actions";
import paginationStyles from "../../../../../../components/Pagination/Pagination.module.css";
import clsx from "clsx";
import Link from "next/link";
import {
  HomeworkStatusSlug,
  HomeworkTypeSlug,
  homeworkStatusFromSlug,
  homeworkStatusToSlug,
  homeworkTypeFromSlug,
  homeworkTypeToSlug,
} from "../../../../../../utils/homework";

type Props = {
  params: { status: HomeworkStatusSlug; type: HomeworkTypeSlug; page: string };
};

const homeworkPageSize = 6;
export default async function HomeworkList({ params }: Props) {
  const hwStatus = Number(
    homeworkStatusFromSlug[params.status] ?? HomeworkStatus.Active
  ) as HomeworkStatus;
  const hwType = Number(
    homeworkTypeFromSlug[params.type] ?? HomeworkType.Homework
  ) as HomeworkType;
  const page = Number(params.page ?? "1");

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
          hasNext={page < maxPages}
          maxPages={maxPages}
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
  maxPages = 500,
}: {
  page: number;
  status: HomeworkStatus;
  type: HomeworkType;
  hasPrev: boolean;
  hasNext: boolean;
  maxPages?: number;
}) => {
  const visiblePages: number[] = [];

  const start = page - Math.floor(limit / 2);
  const safeStart = start > 0 ? start : 1;
  const end = limit + safeStart;
  const safeEnd = end < maxPages ? end : maxPages + 1;

  for (let i = safeStart; i < safeEnd; i++) {
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
            : `/homework/list/${homeworkStatusToSlug[status]}/${
                homeworkTypeToSlug[type]
              }/${page - 1}`
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
            href={`/homework/list/${homeworkStatusToSlug[status]}/${homeworkTypeToSlug[type]}/${p}`}
            passHref
            prefetch={p === safeStart || p === safeEnd - 1 ? true : false}
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
            : `/homework/list/${homeworkStatusToSlug[status]}/${
                homeworkTypeToSlug[type]
              }/${page + 1}`
        }
        passHref
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
