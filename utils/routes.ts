import { HomeworkStatusSlug, HomeworkTypeSlug } from "./homework";

export const paths = {
  home: "home",
  schedule: {
    today: "schedule/today",
    tomorrow: "schedule/tomorrow",
    month: "schedule/month",
  },
  homework: {
    list: {
      default: `homework/list/${HomeworkStatusSlug.active}/${HomeworkTypeSlug.homework}/1`,
    },
  },
  exams: {
    future: "exams/future",
    all: "exams/all",
  },
  news: {
    allNews: "news",
    newsDetails: (id: number) => `${paths.news.allNews}/${id}`,
  },
  leaders: {
    group: "leaders/group",
    stream: "leaders/stream",
  },
  info: "info",
  settings: "settings",
  about: "about",
  error: "error",
  reviews: "reviews",
};

export const getLastRouteSegment = (pathname: string) => {
  const index = pathname.lastIndexOf("/");
  if (index === -1 || pathname.length <= 1) return pathname;
  return pathname.substring(index + 1);
};

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
