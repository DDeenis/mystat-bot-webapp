import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { HomeworkPage } from "../components/Homeworks/HomeworkPage";
import { trpc } from "../utils/trpc";

const Homework: NextPage = () => {
  const [page, setPage] = useState(1);
  const [hwStatus, setHwStatus] = useState(MystatHomeworkStatus.Active);
  const [hwType, setHwType] = useState(MystatHomeworkType.Homework);
  const { data, isLoading, refetch } = trpc.mystat.homework.useQuery({
    hwStatus,
    hwType,
    page,
  });
  const { mutate: updateHw } = trpc.mystat.uploadHw.useMutation();
  const { mutate: deleteHw } = trpc.mystat.deleteHw.useMutation();

  const uploadHomework = (id: number, answerText: string) => {
    updateHw({ id, answerText });
    refetch();
  };

  const deleteHomework = (id: number) => {
    deleteHw({ id });
    refetch();
  };

  useEffect(() => {
    setPage(1);
  }, [hwStatus, hwType]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <BackButton />
      <HomeworkPage
        homeworks={data?.data}
        hwStatus={hwStatus}
        hwType={hwType}
        page={page}
        isLoading={isLoading}
        onStatusChange={setHwStatus}
        onTypeChange={setHwType}
        onPageChange={setPage}
        uploadHomework={uploadHomework}
        deleteHomework={deleteHomework}
      />
    </>
  );
};

export default Homework;
