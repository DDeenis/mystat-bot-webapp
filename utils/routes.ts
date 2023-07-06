export const paths = {
  home: "home",
  schedule: {
    today: "schedule/today",
    tomorrow: "schedule/tomorrow",
    month: "schedule/month",
  },
  homework: "homework",
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
