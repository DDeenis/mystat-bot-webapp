import clsx from "clsx";
import React from "react";
import { formatHomeworkDate } from "../../../utils/dates";
import { InfoCard } from "../../InfoCard/InfoCard";
import styles from "./HomeworkItem.module.css";

type Props = {
  item: any;
};

export const HomeworkChecked = ({ item }: Props) => {
  const mark = item.homework_stud.mark;

  return (
    <InfoCard title={item.name_spec}>
      <InfoCard.Row>
        <InfoCard.Cell>
          <span className={clsx(styles.creationTime, styles.time)}>
            {formatHomeworkDate(item.creation_time)}
          </span>
        </InfoCard.Cell>
        <InfoCard.Cell>
          <span className={clsx(styles.completionTime, styles.time)}>
            {formatHomeworkDate(item.completion_time)}
          </span>
        </InfoCard.Cell>
      </InfoCard.Row>
      <InfoCard.Element>
        <span
          className={clsx(styles.time, {
            [styles.creationTime]: mark >= 9,
            [styles.creationTimeUploaded]: mark <= 8 && mark >= 6,
            [styles.completionTime]: mark <= 5,
          })}
        >
          Оценка {mark}
        </span>
      </InfoCard.Element>
      <InfoCard.Element>{item.theme}</InfoCard.Element>
      <InfoCard.Element>{item.fio_teach}</InfoCard.Element>
      {Boolean(item.comment) && (
        <InfoCard.Element>{item.comment}</InfoCard.Element>
      )}
      <InfoCard.Element>
        <a
          href={item.file_path}
          rel="noopener noreferrer"
          className={styles.filePath}
        >
          Скачать задание
        </a>
      </InfoCard.Element>
      <InfoCard.Element>
        <a
          href={item.homework_stud.file_path}
          rel="noopener noreferrer"
          className={styles.filePath}
        >
          Скачать загруженный файл
        </a>
      </InfoCard.Element>
    </InfoCard>
  );
};
