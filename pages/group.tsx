import React, { useState } from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { LeadersList } from "../components/LeadersList/LeadersList";
import { LeadersVariantsType } from "../utils/leaders";
import { trpc } from "../utils/trpc";

const GroupAndStreamPage = () => {
  const [listFor, setListFor] = useState<LeadersVariantsType>("group");
  const { data } = trpc.useQuery(["mystat.leaders", { list: listFor }]);

  return (
    <>
      <BackButton />
      {data?.success && (
        <LeadersList
          students={data.data}
          listFor={listFor}
          setListFor={setListFor}
        />
      )}
    </>
  );
};

export default GroupAndStreamPage;
