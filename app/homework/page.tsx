import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { HomeworkPage } from "../../components/Homeworks/HomeworkPage";

export default async function Homework() {
  return (
    <>
      <BackButton />
      <HomeworkPage />
    </>
  );
}
