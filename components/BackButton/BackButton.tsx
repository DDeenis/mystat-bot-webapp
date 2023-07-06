"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IconArrowLeft } from "../Icons/Icons";
import styles from "./BackButton.module.css";

type Props = {
  children?: string;
};

export const BackButton = ({ children = "Назад" }: Props) => {
  const { back } = useRouter();

  return (
    <a href="#" onClick={back} className={styles.button}>
      <IconArrowLeft />
      <p className={styles.text}>{children}</p>
    </a>
  );
};
