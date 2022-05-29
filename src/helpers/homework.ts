import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";

export const hwLocalizedVariants = [
  "Текущие",
  "Выполненные",
  "Загруженные",
  "Просроченные",
  "Удаленные",
];

export const hwLocalizedTypes = ["Домашние задания", "Лабораторные"];

export const localizedToStatus = (localized: string): MystatHomeworkStatus => {
  switch (localized) {
    default:
    case "Текущие":
      return MystatHomeworkStatus.Active;

    case "Выполненные":
      return MystatHomeworkStatus.Checked;

    case "Загруженные":
      return MystatHomeworkStatus.Uploaded;

    case "Просроченные":
      return MystatHomeworkStatus.Overdue;

    case "Удаленные":
      return MystatHomeworkStatus.Deleted;
  }
};

export const localizedToType = (localized: string): MystatHomeworkType => {
  switch (localized) {
    default:
    case "Домашние задания":
      return MystatHomeworkType.Homework;

    case "Лабораторные":
      return MystatHomeworkType.Lab;
  }
};
