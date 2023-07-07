import { NewsEntry } from "mystat-api";
import React from "react";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { NewsListElement } from "./NewsListElement";
import styles from "./styles/NewsList.module.css";

type Props = {
  news: NewsEntry[];
};

export const NewsList = ({ news }: Props) => {
  return (
    <div className={styles.container}>
      <EmptyState visible={news?.length === 0}>Нет новостей</EmptyState>
      {news !== undefined &&
        news.map((n) => <NewsListElement item={n} key={n.id_bbs} />)}
    </div>
  );
};
