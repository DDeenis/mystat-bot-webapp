import { useRouter } from "next/router";
import React from "react";
import { IconArrowLeft } from "../Icons/Icons";
import styles from "./BackButton.module.css";

type Props = {
  children?: string;
};

export const BackButton = ({ children = "Назад" }: Props) => {
  const { back } = useRouter();

  return (
    <button onClick={back} className={styles.button}>
      <IconArrowLeft />
      {children}
    </button>
  );
};
