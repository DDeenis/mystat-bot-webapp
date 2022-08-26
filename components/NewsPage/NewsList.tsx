import React from "react";
import { NewsListElement } from "./NewsListElement";
import styles from "./styles/NewsList.module.css";

type Props = {
  news: any[];
};

export const NewsList = ({ news }: Props) => {
  return (
    <div className={styles.container}>
      {news.map((n) => (
        <NewsListElement item={n} key={n.id_bbs} />
      ))}
    </div>
  );
};
