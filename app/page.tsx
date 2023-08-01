"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { paths } from "../utils/routes";
import { env } from "../env.mjs";

// for development only
const fallbackId = env.NEXT_PUBLIC_TEST_ID ?? process.env.NEXT_PUBLIC_TEST_ID;

const maxAttempts = 3;
const handleLogin = (
  userId: number | string,
  onSuccess: () => void,
  onError: () => void
) => {
  if (!userId) return;
  fetch("/api/login", {
    body: userId.toString(),
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

      const userId =
        window.Telegram?.WebApp.initDataUnsafe.user?.id ?? fallbackId;

      if (!userId) {
        setAttempts((curr) => curr + 1);
        return;
      }

      clearInterval(intervalId);
      handleLogin(
        userId,
        () => push(paths.home),
        () => push(paths.error)
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (attempts >= maxAttempts) {
    push(paths.error);
  }

  // TODO: add loader
  return (
    <div className="login-page">Выполняется вход... (Попытка №{attempts})</div>
  );
}
