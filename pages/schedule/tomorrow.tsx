import React from "react";
import { SchedulePage } from "../../components/Schedule/SchedulePage";

const ScheduleTomorrowPage = () => {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  return <SchedulePage scheduleFor="day" defaultDate={tomorrowDate} />;
};

export default ScheduleTomorrowPage;
