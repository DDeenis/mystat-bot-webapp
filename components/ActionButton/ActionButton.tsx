import clsx from "clsx";
import Link from "next/link";
import React from "react";
import styles from "./ActionButton.module.css";

type Props = {
  path: string;
  isDanger?: boolean;
  children: string;
};

export const ActionButton = ({ path, isDanger, children }: Props) => {
  return (
    <Link
      href={path}
      prefetch={false}
      className={clsx(styles.button, {
        [styles.buttonDanger]: isDanger,
      })}
    >
      {children}
    </Link>
  );
};
