import { HomeworkStatus, HomeworkType } from "mystat-api";

export const homeworkVariants = [
  { title: "Текущие", value: HomeworkStatus.Active },
  { title: "Выполненные", value: HomeworkStatus.Checked },
  { title: "Загруженные", value: HomeworkStatus.Uploaded },
  { title: "Просроченные", value: HomeworkStatus.Overdue },
  { title: "Удаленные", value: HomeworkStatus.Deleted },
];

export const homeworkTypes = [
  { title: "Домашние задания", value: HomeworkType.Homework },
  { title: "Лабораторные", value: HomeworkType.Lab },
];
