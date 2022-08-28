import { NextPage } from "next";
import React from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { trpc } from "../utils/trpc";

const UserInfoPage: NextPage = () => {
  const { data } = trpc.useQuery(["mystat.profile"]);
  const { data: dataSettings } = trpc.useQuery(["mystat.profileSettings"]);

  return (
    <>
      <BackButton />
      {data?.success && dataSettings?.success && (
        <UserProfile profileInfo={{ ...data.data, ...dataSettings.data }} />
      )}
    </>
  );
};

export default UserInfoPage;
