import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
}
