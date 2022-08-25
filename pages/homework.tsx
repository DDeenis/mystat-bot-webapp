import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";
import { NextPage } from "next";
import React, { useState } from "react";
import { HomeworkPage } from "../components/Homeworks/HomeworkPage";

const Homework: NextPage = () => {
  const [page, setPage] = useState(1);
  const [hwStatus, setHwStatus] = useState(MystatHomeworkStatus.Active);
  const [hwType, setHwType] = useState(MystatHomeworkType.Homework);

  return (
    <HomeworkPage
      hwStatus={hwStatus}
      hwType={hwType}
      page={page}
      onStatusChange={setHwStatus}
      onTypeChange={setHwType}
      onPageChange={setPage}
    />
  );
};

export default Homework;
