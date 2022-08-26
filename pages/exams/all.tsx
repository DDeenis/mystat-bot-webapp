import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { ExamsList } from "../../components/Exams/ExamsList";
import { trpc } from "../../utils/trpc";

const AllExamsPage = () => {
  const { data } = trpc.useQuery(["mystat.allExams"]);

  return (
    <>
      <BackButton />
      {data?.success && <ExamsList exams={data.data} />}
    </>
  );
};

export default AllExamsPage;
