import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { paths } from "../utils/routes";

// for development only
const fallbackId = undefined;

const LoginPage: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    if (!window) return;

    const userId =
      window.Telegram?.WebApp.initDataUnsafe.user?.id ?? fallbackId;

    fetch("/api/login", {
      body: JSON.stringify(userId),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        // Set-Cookie header not working, so need to set in browser
        document.cookie = `chatId=${userId}`;

        res.logged ? push(paths.home) : push(paths.error);
      })
      .catch((e) => {
        window.Telegram.WebApp.sendData(
          "Авторизация не удалась, убедитесь что вы авторизованы в боте. Так же веб версия пока что не работает в telegram web."
        );
        console.error(e);
      });
  }, []);

  // TODO: add loader
  return <div className="login-page">Выполняется вход...</div>;
};

export default LoginPage;
