import { Homework, HomeworkStatus } from "mystat-api";
import React from "react";
import { HomeworkActive } from "./HomeworkItems/HomeworkActive";
import { HomeworkChecked } from "./HomeworkItems/HomeworkChecked";
import { HomeworkOverdue } from "./HomeworkItems/HomeworkOverdue";
import { HomeworkUploaded } from "./HomeworkItems/HomeworkUploaded";
import styles from "./HomeworksList.module.css";

const homeworkItems = {
  [HomeworkStatus.Active]: HomeworkActive,
  [HomeworkStatus.Uploaded]: HomeworkUploaded,
  [HomeworkStatus.Checked]: HomeworkChecked,
  [HomeworkStatus.Overdue]: HomeworkOverdue,
  [HomeworkStatus.Deleted]: HomeworkActive,
};

type Props = {
  items: Homework[];
  status: HomeworkStatus;
  deleteHomework: (id: number) => void;
};

export const HomeworksList = ({ items, status, deleteHomework }: Props) => {
  const createOnDelete = (id: number) => () => deleteHomework(id);

  return (
    <div className={styles.list}>
      {items.map((hw, i) =>
        React.createElement(homeworkItems[status], {
          item: hw,
          deleteItem: createOnDelete(hw?.homework_stud?.id),
          key: i,
        })
      )}
    </div>
  );
};
