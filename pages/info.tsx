import { NextPage } from "next";
import React from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { LoadingState } from "../components/PageStates/PageStates";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { trpc } from "../utils/trpc";

const UserInfoPage: NextPage = () => {
  const { data, isLoading } = trpc.mystat.profile.useQuery();
  const { data: dataSettings, isLoading: isLoadingSettings } =
    trpc.mystat.profileSettings.useQuery();

  return (
    <>
      <BackButton />
      <LoadingState visible={isLoading || isLoadingSettings} />
      {data?.success && dataSettings?.success && (
        <UserProfile profileInfo={{ ...data.data, ...dataSettings.data }} />
      )}
    </>
  );
};

export default UserInfoPage;
