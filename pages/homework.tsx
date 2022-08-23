import {
  MystatHomeworkStatus,
  MystatHomeworkType,
} from "mystat-api/dist/types";
import { NextPage } from "next";
import React, { useState } from "react";
import { HomeworkPage } from "../components/Homeworks/HomeworkPage";

const Homework: NextPage = () => {
  const [hwStatus, setHwStatus] = useState(MystatHomeworkStatus.Active);
  const [hwType, setHwType] = useState(MystatHomeworkType.Homework);

  return (
    <HomeworkPage
      hwStatus={hwStatus}
      hwType={hwType}
      onStatusChange={setHwStatus}
      onTypeChange={setHwType}
    />
  );
};

export default Homework;
