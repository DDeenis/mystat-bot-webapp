"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IconArrowLeft } from "../Icons/Icons";
import styles from "./BackButton.module.css";

type Props = {
  children?: string;
  forcePath?: string;
};

export const BackButton = ({ children = "Назад", forcePath }: Props) => {
  const router = useRouter();

  const back = () => (forcePath ? router.push(forcePath) : router.back());

  return (
    <a href="#" onClick={back} className={styles.button}>
      <IconArrowLeft />
      <p className={styles.text}>{children}</p>
    </a>
  );
};
