import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { Settings } from "../../components/Settings/Settings";
import { getAllThemes } from "../../server/database/themes";

export default async function SettingsPage() {
  const themes = await getAllThemes();

  return (
    <>
      <BackButton />
      <Settings themes={themes ?? []} />
    </>
  );
}
