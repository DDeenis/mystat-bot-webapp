import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { useEffect } from "react";
import type { AppRouter } from "../server/routers/app";
import "../styles/global.css";

// for development only
const fallbackId = undefined;

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (!window) return;

    const userId =
      window.Telegram.WebApp.initDataUnsafe?.user?.id ?? fallbackId;

    fetch("/api/login", {
      body: JSON.stringify(userId),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        // Set-Cookie header not working, so need to set in browser
        document.cookie = `chatId=${userId}`;
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className="main-container">
      <Component {...pageProps} />
    </main>
  );
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      url: `${getBaseUrl()}/api/trpc`,
      // cookies not included in SSR by default
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie,
        };
      },
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
