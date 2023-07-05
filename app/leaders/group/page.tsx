import React from "react";
import { LeadersList } from "../../../components/LeadersList/LeadersList";
import { getGroupLeaders, getProfile } from "../../../utils/actions";

export default async function GroupLeadersPage() {
  const [profile, leaders] = await Promise.all([
    getProfile(),
    getGroupLeaders(),
  ]);

  return (
    <LeadersList
      students={leaders?.data ?? []}
      studentId={profile?.data?.student_id}
    />
  );
}
