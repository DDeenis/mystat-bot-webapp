import React from "react";
import { BackButton } from "../../../components/BackButton/BackButton";
import { ExamsList } from "../../../components/Exams/ExamsList";
import { getFutureExams } from "../../../server/actions";

export default async function FutureExamsPage() {
  const exams = await getFutureExams();

  return (
    <>
      <BackButton />
      <ExamsList exams={exams ?? []} />
    </>
  );
}
