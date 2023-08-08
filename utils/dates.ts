const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const monthNamesTitle = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const formatScheduleDate = (date: Date) =>
  `${date.getDate()} ${monthNamesTitle[date.getMonth()]} ${date.getFullYear()}`;

const padDate = (val: number) => val.toString().padStart(2, "0");

export const formatHomeworkDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${padDate(date.getDate())}.${padDate(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
};

export const formatNewsDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${formatHomeworkDate(dateStr)} ${padDate(date.getHours())}:${padDate(
    date.getMinutes()
  )}`;
};

export const formatExamDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${padDate(date.getDate())}.${padDate(
    date.getMonth() + 1
  )}\n${date.getFullYear()}`;
};

export const formatReviewsDate = (dateStr: string) => {
  return formatNewsDate(dateStr);
};

export const isDatesEqual = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};
