import { Review } from "mystat-api";
import React from "react";
import styles from "./ReviewsList.module.css";
import { ReviewsListElement } from "./ReviewsListElement";

type Props = {
  reviews: Review[];
};

export const ReviewsList = ({ reviews }: Props) => {
  return (
    <div className={styles.container}>
      {reviews.map((r) => (
        <ReviewsListElement review={r} key={r.date} />
      ))}
    </div>
  );
};
