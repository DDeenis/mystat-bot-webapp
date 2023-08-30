import { SkeletonBlock } from "../../components/Skeleton/Skeleton";

export default async function Loading() {
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
