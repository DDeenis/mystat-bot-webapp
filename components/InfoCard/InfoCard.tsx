import clsx from "clsx";
import React from "react";
import styles from "./InfoCard.module.css";

type Props = {
  title?: string;
  children?: React.ReactNode;
  ghost?: boolean;
};

type Extentions = {
  Element: typeof CardElement;
  Row: typeof CardRow;
  Cell: typeof CardCell;
};

export const InfoCard: React.FC<Props> & Extentions = ({
  title,
  ghost,
  children,
}) => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.cardGhost]: ghost,
      })}
    >
      {title && <p className={styles.subject}>{title}</p>}
      <div className={styles.elementsContainer}>{children}</div>
    </div>
  );
};

interface ElementProps {
  children?: React.ReactNode;
}

const CardElement = ({ children }: ElementProps) => {
  return <div className={styles.cardElement}>{children}</div>;
};

const CardRow = ({ children }: ElementProps) => {
  return <div className={styles.cardRow}>{children}</div>;
};

const CardCell = ({ children }: ElementProps) => {
  return (
    <div className={clsx(styles.cardElement, styles.cardCell)}>{children}</div>
  );
};

InfoCard.Element = CardElement;
InfoCard.Row = CardRow;
InfoCard.Cell = CardCell;
