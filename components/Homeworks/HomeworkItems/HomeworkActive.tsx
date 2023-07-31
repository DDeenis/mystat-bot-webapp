import clsx from "clsx";
import { Homework } from "mystat-api";
import React from "react";
import { formatHomeworkDate } from "../../../utils/dates";
import { InfoCard } from "../../InfoCard/InfoCard";
import styles from "./HomeworkItem.module.css";
import Link from "next/link";

type Props = {
  item: Homework;
};

export const HomeworkActive = ({ item }: Props) => {
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
      <InfoCard.Element>{item.theme}</InfoCard.Element>
      <InfoCard.Element>{item.fio_teach}</InfoCard.Element>
      {Boolean(item.comment) && (
        <InfoCard.Element>{item.comment}</InfoCard.Element>
      )}
      <InfoCard.Button>
        <a
          href={item.file_path}
          rel="noopener noreferrer"
          className={styles.filePath}
        >
          Скачать задание
        </a>
      </InfoCard.Button>
      <InfoCard.Button>
        <Link
          href={`/homework/upload/${item.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Загрузить задание
        </Link>
      </InfoCard.Button>
    </InfoCard>
  );
};
