import React from "react";
import { formatReviewsDate } from "../../utils/dates";
import styles from "./ReviewsListElement.module.css";

type Props = {
  review: any;
};

export const ReviewsListElement = ({ review }: Props) => {
  return (
    <figure className={styles.container}>
      <p className={styles.spec}>{review.spec}</p>
      <blockquote className={styles.review}>{review.message}</blockquote>
      <figcaption className={styles.caption}>
        {review.teacher} ({formatReviewsDate(review.date)})
      </figcaption>
    </figure>
  );
};
