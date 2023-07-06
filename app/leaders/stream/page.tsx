import React from "react";
import { LeadersList } from "../../../components/LeadersList/LeadersList";
import { getProfile, getStreamLeaders } from "../../../utils/actions";

export default async function StreamLeadersPage() {
  const [profile, leaders] = await Promise.all([
    getProfile(),
    getStreamLeaders(),
  ]);

  return (
    <LeadersList
      students={leaders?.data ?? []}
      studentId={profile?.data?.student_id}
    />
  );
}
