import { MystatHomeworkStatus } from "mystat-api/dist/types";
import React from "react";
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
  uploadHomework: (id: number, answerText: string) => void;
  deleteHomework: (id: number) => void;
};

export const HomeworksList = ({
  items,
  status,
  uploadHomework,
  deleteHomework,
}: Props) => {
  const createOnUpload = (id: number) => (answerText: string) =>
    uploadHomework(id, answerText);
  const createOnDelete = (id: number) => () => deleteHomework(id);

  return (
    <div className={styles.list}>
      {items.map((hw, i) =>
        React.createElement(homeworkItems[status], {
          item: hw,
          upload: createOnUpload(hw.id),
          deleteItem: createOnDelete(hw?.homework_stud?.id),
          key: i,
        })
      )}
    </div>
  );
};
