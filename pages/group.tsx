import React, { useState } from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { LeadersList } from "../components/LeadersList/LeadersList";
import { Multiselect } from "../components/Multiselect/Multiselect";
import { leadersVariants, LeadersVariantsType } from "../utils/leaders";
import { trpc } from "../utils/trpc";

const GroupAndStreamPage = () => {
  const [listFor, setListFor] = useState<LeadersVariantsType>("group");
  const { data, isLoading } = trpc.useQuery([
    "mystat.leaders",
    { list: listFor },
  ]);
  const { data: profile, isLoading: isLoadingProfile } = trpc.useQuery([
    "mystat.profile",
  ]);

  return (
    <>
      <BackButton />
      <Multiselect
        variants={leadersVariants}
        selectedVariant={listFor}
        onSelect={setListFor}
        variantsAsTabs
      />
      <LeadersList
        students={data?.data}
        studentId={profile?.data?.student_id}
        isLoading={isLoading || isLoadingProfile}
      />
    </>
  );
};

export default GroupAndStreamPage;
