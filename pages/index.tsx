import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createSSGHelpers } from "@trpc/react/ssg";
import { paths } from "../utils/routes";
import { appRouter } from "../server/routers/app";
import { createContext } from "../server/context";
import { trpc } from "../utils/trpc";
import { applyTheme, defaultTheme } from "../utils/themes";

// for development only
const fallbackId = undefined;

const LoginPage: NextPage = ({
  themeId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();
  const { data, isLoading } = trpc.useQuery(["theme.get", { id: themeId }]);
  console.log(data);

  useEffect(() => {
    applyTheme(data?.theme ?? defaultTheme);
  }, [isLoading]);

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
        console.error(e);
      });
  }, []);

  // TODO: add loader
  return <div className="login-page">Выполняется вход...</div>;
};

const defaultThemeId = 1;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const themeFromCookies = req.cookies?.theme;

  const themeId = themeFromCookies
    ? parseInt(themeFromCookies)
    : defaultThemeId;
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
  });
  ssg.prefetchQuery("theme.get", { id: themeId });

  return {
    props: {
      themeId,
    },
  };
};

export default LoginPage;
