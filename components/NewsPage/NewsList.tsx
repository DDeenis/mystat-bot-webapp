import { MystatNewsEntry } from "mystat-api/dist/types";
import React from "react";
import { EmptyState, LoadingState } from "../PageStates/PageStates";
import { NewsListElement } from "./NewsListElement";
import styles from "./styles/NewsList.module.css";

type Props = {
  news?: MystatNewsEntry[];
  isLoading?: boolean;
};

export const NewsList = ({ news, isLoading }: Props) => {
  return (
    <div className={styles.container}>
      <LoadingState visible={isLoading} />
      <EmptyState visible={news?.length === 0 && !isLoading}>
        Нет новостей
      </EmptyState>
      {news !== undefined &&
        news.map((n) => <NewsListElement item={n} key={n.id_bbs} />)}
    </div>
  );
};
