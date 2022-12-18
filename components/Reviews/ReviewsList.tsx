import { MystatReview } from "mystat-api/dist/types";
import React from "react";
import styles from "./ReviewsList.module.css";
import { ReviewsListElement } from "./ReviewsListElement";

type Props = {
  reviews: MystatReview[];
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
