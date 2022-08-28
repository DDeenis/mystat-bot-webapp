import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { ExamsList } from "../../components/Exams/ExamsList";
import { trpc } from "../../utils/trpc";

const AllExamsPage = () => {
  const { data, isLoading } = trpc.useQuery(["mystat.allExams"]);

  return (
    <>
      <BackButton />
      <ExamsList exams={data?.data} isLoading={isLoading} />
    </>
  );
};

export default AllExamsPage;
