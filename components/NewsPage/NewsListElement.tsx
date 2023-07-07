import { NewsEntry } from "mystat-api";
import Link from "next/link";
import React from "react";
import { formatNewsDate } from "../../utils/dates";
import { paths } from "../../utils/routes";
import styles from "./styles/NewsListElement.module.css";

type Props = {
  item: NewsEntry;
};

export const NewsListElement = ({ item }: Props) => {
  return (
    <Link
      href={paths.news.newsDetails(item.id_bbs)}
      passHref
      style={{ textDecoration: "none" }}
    >
      <div className={styles.container}>
        <p className={styles.theme}>{item.theme}</p>
        <p className={styles.date}>{formatNewsDate(item.time)}</p>
      </div>
    </Link>
  );
};
