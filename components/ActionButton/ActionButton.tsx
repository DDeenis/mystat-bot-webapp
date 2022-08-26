import clsx from "clsx";
import Link from "next/link";
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
    <Link href={path}>
      <button
        className={clsx(styles.button, {
          [styles.buttonDanger]: isDanger,
        })}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
};
