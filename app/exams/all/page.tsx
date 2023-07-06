import React from "react";
import { BackButton } from "../../../components/BackButton/BackButton";
import { ExamsList } from "../../../components/Exams/ExamsList";
import { getAllExams } from "../../../utils/actions";

export default async function AllExamsPage() {
  const exams = await getAllExams();

  return (
    <>
      <BackButton />
      <ExamsList exams={exams?.data ?? []} />
    </>
  );
}
