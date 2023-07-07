import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { Settings } from "../../components/Settings/Settings";

export default async function SettingsPage() {
  return (
    <>
      <BackButton />
      <Settings />
    </>
  );
}
