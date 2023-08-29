"use client";
import { UserInfoBar } from "../../components/UserInfoBar/UserInfoBar";
import { SkeletonBlock } from "../../components/Skeleton/Skeleton";
import React from "react";
import { UserInfo } from "mystat-api";

export default function Home() {
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const loadingRef = React.useRef(false);

  React.useEffect(() => {
    // fetch user info only once
    if (loadingRef.current) return;
    loadingRef.current = true;
    fetch("/api/user")
      .then((r) => {
        if (!r.ok) throw r;
        return r.json();
      })
      .then((r) => {
        setUserInfo(r);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

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
