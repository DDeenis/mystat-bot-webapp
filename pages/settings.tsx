import { NextPage } from "next";
import React from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { Settings } from "../components/Settings/Settings";

const SettingsPage: NextPage = () => {
  return (
    <>
      <BackButton />
      <Settings />
    </>
  );
};

export default SettingsPage;
