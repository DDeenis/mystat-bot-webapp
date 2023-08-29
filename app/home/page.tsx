"use client";
import { UserInfoBar } from "../../components/UserInfoBar/UserInfoBar";
import { SkeletonBlock } from "../../components/Skeleton/Skeleton";
import { useUserInfo } from "../../utils/hooks";

export default function Home() {
  const { userInfo } = useUserInfo();

  return userInfo ? (
    <UserInfoBar userInfo={userInfo} />
  ) : (
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
