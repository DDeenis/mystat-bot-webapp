import { Review } from "mystat-api";
import React from "react";
import { formatReviewsDate } from "../../utils/dates";
import styles from "./ReviewsListElement.module.css";

type Props = {
  review: Review;
};

export const ReviewsListElement = ({ review }: Props) => {
  return (
    <figure className={styles.container}>
      <h3 className={styles.spec}>{review.spec}</h3>
      <blockquote className={styles.review}>{review.message}</blockquote>
      <figcaption className={styles.caption}>
        {review.teacher} (
        <time dateTime={review.date}>{formatReviewsDate(review.date)}</time>)
      </figcaption>
    </figure>
  );
};
