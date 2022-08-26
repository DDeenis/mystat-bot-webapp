import React from "react";
import { formatNewsDate } from "../../utils/dates";
import styles from "./styles/NewsDetails.module.css";

type Props = {
  news: any;
};

export const NewsDetails = ({ news }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.newsInfo}>
        <h1 className={styles.theme}>{news.theme}</h1>
        <p className={styles.time}>Опубликовано {formatNewsDate(news.time)}</p>
      </div>
      <div
        className={styles.newsContent}
        dangerouslySetInnerHTML={{ __html: news.text_bbs }}
      />
    </div>
  );
};
