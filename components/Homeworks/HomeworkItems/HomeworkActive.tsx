import React from "react";
import styles from "./HomeworkItem.module.css";

type Props = {
  item: any;
};

export const HomeworkActive = ({ item }: Props) => {
  return (
    <div className={styles.hwItemContainer}>
      <span>✏️ Предмет: {item.name_spec}</span>
      <span>📖 Тема: {item.theme}</span>
      <span>💡 Преподаватель: {item.fio_teach}</span>
      <span>📅 Дата выдачи: {item.creation_time}</span>
      <span>❕ Сдать до: {item.completion_time}</span>
      <span>✒️ Комментарий: {item.comment}</span>
      <a href={item.file_path} rel="noopener noreferrer">
        📁 Путь к файлу
      </a>
    </div>
  );
};
