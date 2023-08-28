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

export enum HomeworkStatusSlug {
  active = "active",
  checked = "checked",
  uploaded = "uploaded",
  overdue = "overdue",
  deleted = "deleted",
}
export const homeworkStatusToSlug = {
  [HomeworkStatus.Active]: HomeworkStatusSlug.active,
  [HomeworkStatus.Checked]: HomeworkStatusSlug.checked,
  [HomeworkStatus.Uploaded]: HomeworkStatusSlug.uploaded,
  [HomeworkStatus.Overdue]: HomeworkStatusSlug.overdue,
  [HomeworkStatus.Deleted]: HomeworkStatusSlug.deleted,
};
export const homeworkStatusFromSlug = {
  [HomeworkStatusSlug.active]: HomeworkStatus.Active,
  [HomeworkStatusSlug.checked]: HomeworkStatus.Checked,
  [HomeworkStatusSlug.uploaded]: HomeworkStatus.Uploaded,
  [HomeworkStatusSlug.overdue]: HomeworkStatus.Overdue,
  [HomeworkStatusSlug.deleted]: HomeworkStatus.Deleted,
};

export enum HomeworkTypeSlug {
  homework = "homework",
  lab = "lab",
}
export const homeworkTypeToSlug = {
  [HomeworkType.Homework]: HomeworkTypeSlug.homework,
  [HomeworkType.Lab]: HomeworkTypeSlug.lab,
};
export const homeworkTypeFromSlug = {
  [HomeworkTypeSlug.homework]: HomeworkType.Homework,
  [HomeworkTypeSlug.lab]: HomeworkType.Lab,
};
