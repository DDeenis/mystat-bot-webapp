import { MystatHomeworkStatus } from "mystat-api/dist/types";
import React from "react";
import { HomeworkActive } from "./HomeworkItems/HomeworkActive";
import styles from "./HomeworksList.module.css";

const homeworkItems = {
  [MystatHomeworkStatus.Active]: HomeworkActive,
  [MystatHomeworkStatus.Checked]: HomeworkActive,
  [MystatHomeworkStatus.Deleted]: HomeworkActive,
  [MystatHomeworkStatus.Overdue]: HomeworkActive,
  [MystatHomeworkStatus.Uploaded]: HomeworkActive,
};

type Props = {
  items: any[];
  status: MystatHomeworkStatus;
};

export const HomeworksList = ({ items, status }: Props) => {
  return (
    <div className={styles.list}>
      {items.map((hw) =>
        React.createElement(homeworkItems[status], {
          item: hw,
        })
      )}
    </div>
  );
};
