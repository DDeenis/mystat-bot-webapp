import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { paths } from "../utils/routes";

// for development only
const fallbackId = undefined;

const handleLogin = (
  userId: number,
  onSuccess: () => void,
  onError: () => void
) => {
  fetch("/api/login", {
    body: JSON.stringify(userId),
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

const LoginPage: NextPage = () => {
  const { push, reload } = useRouter();

  useEffect(() => {
    if (!window) return;

    const userId =
      window.Telegram?.WebApp.initDataUnsafe.user?.id ?? fallbackId;

    if (!userId) {
      reload();
    }

    handleLogin(
      userId,
      () => push(paths.home),
      () => push(paths.error)
    );
  }, []);

  // TODO: add loader
  return <div className="login-page">Выполняется вход...</div>;
};

export default LoginPage;
