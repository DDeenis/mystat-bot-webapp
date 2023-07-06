"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { paths } from "../utils/routes";

// for development only
const fallbackId = undefined;

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
      // Set-Cookie header not working, so need to set in browser
      document.cookie = `chatId=${userId}`;

      res.logged ? onSuccess() : onError();
    })
    .catch((e) => {
      console.error(e);
    });
};

export default function Page() {
  const { push, refresh } = useRouter();
  const attempts = useRef(1);

  useEffect(() => {
    if (!window) return;

    const userId =
      window.Telegram?.WebApp.initDataUnsafe.user?.id ?? fallbackId;

    if (!userId) {
      refresh();
      attempts.current += 1;
    }

    handleLogin(
      userId,
      () => push(paths.home),
      () => push(paths.error)
    );
  }, []);

  if (attempts.current >= maxAttempts) {
    push(paths.error);
  }

  // TODO: add loader
  return (
    <div className="login-page">
      Выполняется вход... (Попытка №{attempts.current})
    </div>
  );
}
