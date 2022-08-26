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
  group: "group",
  info: "info",
  settings: "settings",
  about: "about",
  error: "error",
  reviews: "reviews",
};
