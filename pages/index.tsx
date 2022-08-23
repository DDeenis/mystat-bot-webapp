import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { paths } from "../utils/routes";

const LoginPage: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    if (!window) return;

    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;

    fetch("/api/login", {
      body: JSON.stringify(userId),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        // Set-Cookie header not working, so need to set in browser
        document.cookie = `chatId=${userId}`;

        res.logged ? push(paths.home) : push(paths.error);
      });
  }, []);

  // TODO: add loader
  return <div className="login-page">Выполняется вход...</div>;
};

export default LoginPage;
