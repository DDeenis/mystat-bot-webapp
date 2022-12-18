import { NextPage } from "next";
import React from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { Settings } from "../components/Settings/Settings";
import { trpc } from "../utils/trpc";

const SettingsPage: NextPage = () => {
  const { data, isLoading } = trpc.theme.getAll.useQuery();

  return (
    <>
      <BackButton />
      <Settings themes={data} isLoading={isLoading} />
    </>
  );
};

export default SettingsPage;
