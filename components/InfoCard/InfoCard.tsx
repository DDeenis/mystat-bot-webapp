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
  Button: typeof CardButton;
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

interface ButtonProps extends ElementProps {
  disabled?: boolean;
  warning?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

const CardButton = ({ children, onClick, disabled, warning }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.cardElement, styles.button, {
        [styles.button_disabled]: disabled,
        [styles.button_warning]: warning,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

InfoCard.Element = CardElement;
InfoCard.Row = CardRow;
InfoCard.Cell = CardCell;
InfoCard.Button = CardButton;
