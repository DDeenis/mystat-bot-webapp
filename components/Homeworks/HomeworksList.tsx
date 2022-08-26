import { MystatHomeworkStatus } from "mystat-api/dist/types";
import React from "react";
import { Pagination } from "../Pagination/Pagination";
import { HomeworkActive } from "./HomeworkItems/HomeworkActive";
import { HomeworkChecked } from "./HomeworkItems/HomeworkChecked";
import { HomeworkOverdue } from "./HomeworkItems/HomeworkOverdue";
import { HomeworkUploaded } from "./HomeworkItems/HomeworkUploaded";
import styles from "./HomeworksList.module.css";

const homeworkItems = {
  [MystatHomeworkStatus.Active]: HomeworkActive,
  [MystatHomeworkStatus.Uploaded]: HomeworkUploaded,
  [MystatHomeworkStatus.Checked]: HomeworkChecked,
  [MystatHomeworkStatus.Overdue]: HomeworkOverdue,
  [MystatHomeworkStatus.Deleted]: HomeworkActive,
};

type Props = {
  items: any[];
  status: MystatHomeworkStatus;
  page: number;
  onPageChange: (page: number) => void;
};

export const HomeworksList = ({ items, status, page, onPageChange }: Props) => {
  return (
    <>
      <div className={styles.list}>
        {items.map((hw, i) =>
          React.createElement(homeworkItems[status], {
            item: hw,
            key: i,
          })
        )}
      </div>
      {items.length !== 0 && (
        <Pagination page={page} maxPages={10} onPageChange={onPageChange} />
      )}
    </>
  );
};
