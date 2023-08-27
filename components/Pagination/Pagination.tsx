import clsx from "clsx";
import React from "react";
import styles from "./Pagination.module.css";

type Props = {
  page: number;
  maxPages: number;
  onPageChange: (page: number) => void;
};

const limit = 6;

export const Pagination = ({ page, maxPages, onPageChange }: Props) => {
  const visiblePages: number[] = [];

  const start = page - Math.floor(limit / 2);
  const safeStart = start > 0 ? start : 1;
  const end = limit + safeStart;
  const safeEnd = end < maxPages ? end : maxPages + 1;
  console.log(safeStart, safeEnd);

  for (let i = safeStart; i < safeEnd; i++) {
    visiblePages.push(i);
  }

  const onPrev = () => onPageChange(page - 1 > 1 ? page - 1 : 1);
  const onNext = () => onPageChange(page + 1 > maxPages ? maxPages : page + 1);
  const createOnChange = (page: number) => () => onPageChange(page);

  const prevDisabled = page === 1;
  const nextDisabled = page === maxPages;

  return (
    <div className={styles.container}>
      <button
        className={clsx(styles.buttonControl, styles.buttonPrev, {
          [styles.buttonControl_disabled]: prevDisabled,
        })}
        disabled={prevDisabled}
        onClick={onPrev}
      />
      <div className={styles.pagesContainer}>
        {visiblePages.map((p) => (
          <button
            className={clsx(styles.page, {
              [styles.page_selected]: p === page,
            })}
            onClick={createOnChange(p)}
            key={p}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        className={clsx(styles.buttonControl, styles.buttonNext, {
          [styles.buttonControl_disabled]: nextDisabled,
        })}
        disabled={nextDisabled}
        onClick={onNext}
      />
    </div>
  );
};
