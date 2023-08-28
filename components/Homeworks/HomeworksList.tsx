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
};

export const HomeworksList = ({ items, status }: Props) => {
  const deleteHw = (obj: { id: number }) => {
    return fetch("/api/homework", {
      body: JSON.stringify(obj),
      method: "DELETE",
    });
  };

  const createOnDelete = (id: number) => () => deleteHw({ id });

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
