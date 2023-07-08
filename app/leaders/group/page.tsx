import React from "react";
import { LeadersList } from "../../../components/LeadersList/LeadersList";
import { getGroupLeaders, getProfile } from "../../../server/actions";

export default async function GroupLeadersPage() {
  const profile = await getProfile();
  const leaders = await getGroupLeaders();

  return (
    <LeadersList students={leaders ?? []} studentId={profile?.student_id} />
  );
}
