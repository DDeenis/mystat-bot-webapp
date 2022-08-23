import clsx from "clsx";
import React from "react";
import styles from "./ActionButton.module.css";

type Props = {
  path: string;
  isDanger?: boolean;
  onClick?: () => void;
  children: string;
};

export const ActionButton = ({ path, isDanger, onClick, children }: Props) => {
  return (
    <a href={path}>
      <button
        className={clsx(styles.button, {
          [styles.buttonDanger]: isDanger,
        })}
        onClick={onClick}
      >
        {children}
      </button>
    </a>
  );
};
