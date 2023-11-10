"use client";
import React from "react";
import { SchedulePage } from "../../../components/Schedule/SchedulePage";

export default async function ScheduleTodayPage() {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  return <SchedulePage defaultDate={tomorrowDate} />;
}
