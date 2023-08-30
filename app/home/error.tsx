"use client";
import { useEffect } from "react";
import { SkeletonBlock } from "../../components/Skeleton/Skeleton";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  // just continue to show loading skeleton
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        borderRadius: "var(--border-radius-lg)",
        backgroundColor: "var(--bg-primary)",
        padding: "0.5rem 0.75rem",
      }}
    >
      <SkeletonBlock
        width="25px"
        height="25px"
        rounding="full"
        style={{ flexShrink: 0 }}
      />
      <SkeletonBlock rounding="sm" />
    </div>
  );
}
