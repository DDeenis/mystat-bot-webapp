import React, { useState } from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { LeadersList } from "../components/LeadersList/LeadersList";
import { Multiselect } from "../components/Multiselect/Multiselect";
import { leadersVariants, LeadersVariantsType } from "../utils/leaders";
import { trpc } from "../utils/trpc";

const GroupAndStreamPage = () => {
  const [listFor, setListFor] = useState<LeadersVariantsType>("group");
  const { data } = trpc.useQuery(["mystat.leaders", { list: listFor }]);
  const { data: profile } = trpc.useQuery(["mystat.profile"]);

  return (
    <>
      <BackButton />
      <Multiselect
        variants={leadersVariants}
        selectedVariant={listFor}
        onSelect={setListFor}
        variantsAsTabs
      />
      {data?.success && (
        <LeadersList
          students={data.data}
          studentId={profile?.data?.student_id}
        />
      )}
    </>
  );
};

export default GroupAndStreamPage;
