import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";

export const homeworkVariants = [
  { title: "Текущие", value: MystatHomeworkStatus.Active },
  { title: "Выполненные", value: MystatHomeworkStatus.Checked },
  { title: "Загруженные", value: MystatHomeworkStatus.Uploaded },
  { title: "Просроченные", value: MystatHomeworkStatus.Overdue },
  { title: "Удаленные", value: MystatHomeworkStatus.Deleted },
];

export const homeworkTypes = [
  { title: "Домашние задания", value: MystatHomeworkType.Homework },
  { title: "Лабораторные", value: MystatHomeworkType.Lab },
];
