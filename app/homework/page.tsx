"use client";
import {
  MystatHomework,
  MystatHomeworkStatus,
  MystatHomeworkType,
  MystatResponse,
} from "mystat-api/dist/types";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { HomeworkPage } from "../../components/Homeworks/HomeworkPage";

export default async function Homework() {
  const [page, setPage] = React.useState(1);
  const [hwStatus, setHwStatus] = React.useState(MystatHomeworkStatus.Active);
  const [hwType, setHwType] = React.useState(MystatHomeworkType.Homework);
  const [isLoading, setIsLoading] = React.useState(false);
  const [homework, setHomework] = React.useState<MystatHomework[]>([]);

  const fetchHomeworks = async () => {
    setIsLoading(true);
    const response = await fetch(
      `/api/homework?hwStatus=${hwStatus}&hwType=${hwType}&page=${page}`
    );
    setIsLoading(false);

    const homeworkList: MystatResponse<MystatHomework[]> =
      await response.json();
    setHomework(homeworkList.data ?? []);
  };

  const updateHw = (obj: { id: number; answerText: string }) => {
    return fetch("/api/homework", {
      body: JSON.stringify(obj),
      method: "POST",
    });
  };

  const deleteHw = (obj: { id: number }) => {
    return fetch("/api/homework", {
      body: JSON.stringify(obj),
      method: "DELETE",
    });
  };

  const uploadHomework = (id: number, answerText: string) => {
    updateHw({ id, answerText });
    fetchHomeworks();
  };

  const deleteHomework = (id: number) => {
    deleteHw({ id });
    fetchHomeworks();
  };

  React.useEffect(() => {
    setPage(1);
    // fetchHomeworks();
  }, [hwStatus, hwType]);

  React.useEffect(() => {
    fetchHomeworks().then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [page]);

  return (
    <>
      <BackButton />
      <HomeworkPage
        homeworks={homework}
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
}
