import React, { useState } from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { LeadersList } from "../components/LeadersList/LeadersList";
import { trpc } from "../utils/trpc";

const GroupAndStreamPage = () => {
  const [listFor, setListFor] = useState<"group" | "stream">("group");
  const { data } = trpc.useQuery(["mystat.leaders", { list: listFor }]);

  return (
    <>
      <BackButton />
      {data?.success && <LeadersList students={data.data} />}
    </>
  );
};

export default GroupAndStreamPage;
