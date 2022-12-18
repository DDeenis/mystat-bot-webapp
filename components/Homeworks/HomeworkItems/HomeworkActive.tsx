import clsx from "clsx";
import { MystatHomework } from "mystat-api/dist/types";
import React, { useState } from "react";
import { formatHomeworkDate } from "../../../utils/dates";
import { InfoCard } from "../../InfoCard/InfoCard";
import { HomeworkUploadModal } from "../HomeworkUploadModal";
import styles from "./HomeworkItem.module.css";

type Props = {
  item: MystatHomework;
  upload: (answerText: string) => void;
};

export const HomeworkActive = ({ item, upload }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

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
      <InfoCard.Button onClick={onOpen}>Загрузить задание</InfoCard.Button>
      <HomeworkUploadModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={upload}
      />
    </InfoCard>
  );
};
