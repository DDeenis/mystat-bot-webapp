"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { paths } from "../utils/routes";
import { env } from "../env.mjs";
import { LoadingGrid } from "../components/Loaders/Loaders";

// for development only
const fallbackData =
  env.NEXT_PUBLIC_TEST_DATA ?? process.env.NEXT_PUBLIC_TEST_DATA;

const maxAttempts = 3;
const handleLogin = (
  initData: string,
  onSuccess: () => void,
  onError: () => void
) => {
  if (!initData) return;
  fetch("/api/login", {
    body: initData,
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => {
      res.logged ? onSuccess() : onError();
    })
    .catch((e) => {
      console.error(e);
    });
};

export default function Page() {
  const { push } = useRouter();
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!window) return;

      let initData = window.Telegram?.WebApp?.initData ?? fallbackData;

      // for development only
      if (!initData) {
        initData = fallbackData ?? initData;
      }

      if (!initData) {
        setAttempts((curr) => curr + 1);
        return;
      }

      clearInterval(intervalId);
      handleLogin(
        initData,
        () => push(paths.home),
        () => push(paths.error)
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (attempts >= maxAttempts) {
    push(paths.error);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <LoadingGrid />
      <span>Выполняется вход</span>
    </div>
  );
}
