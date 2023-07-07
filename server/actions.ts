"use server";
import { cookies } from "next/headers";
import { getUserByChatId } from "./database/users";
import { createClient, HomeworkStatus, HomeworkType } from "mystat-api";

const getUser = async () => {
  const chatIdStr = cookies().get("chatId");

  if (!chatIdStr?.value) return null;

  const chatId = parseInt(chatIdStr.value);

  const userFromDb = await getUserByChatId({ chatId });
  if (!userFromDb) throw `User with id ${chatId} not registered`;
  const apiClient = await createClient({
    loginData: userFromDb,
    language: "ru",
    cache: true,
  });
  return apiClient;
};

export const getSchedule = async (
  scheduleFor: "day" | "month",
  dateStr: string
) => {
  const user = await getUser();
  const date = new Date(dateStr);

  if (scheduleFor === "day") {
    return user?.getScheduleByDate(date);
  }

  return user?.getMonthSchedule(date);
};

export const getHomeworkList = async (
  hwStatus: HomeworkStatus,
  hwType: HomeworkType,
  page: number
) => {
  const user = await getUser();
  return user?.getHomeworkList(hwStatus, page, hwType);
};

export const getProfile = async () => {
  const user = await getUser();
  return user?.getUserInfo();
};

export const getAllNews = async () => {
  const user = await getUser();
  return user?.getLatestNews();
};

export const getNewsDetails = async (id: number) => {
  const user = await getUser();
  return user?.getNewsDetails(id);
};

export const getFutureExams = async () => {
  const user = await getUser();
  return user?.getFutureExams();
};

export const getAllExams = async () => {
  const user = await getUser();
  return user?.getAllExams();
};

export const getGroupLeaders = async () => {
  const user = await getUser();
  return user?.getGroupLeaders();
};

export const getStreamLeaders = async () => {
  const user = await getUser();
  return user?.getStreamLeaders();
};

export const getUserSettings = async () => {
  const user = await getUser();
  return user?.getUserSettings();
};

export const getReviews = async () => {
  const user = await getUser();
  return user?.getReviews();
};

export const uploadHomework = async ({
  id,
  answerText,
}: {
  id: number;
  answerText: string;
}) => {
  const user = await getUser();
  return user?.uploadHomework({ homeworkId: id, answerText });
};

export const deleteHomework = async (id: number) => {
  const user = await getUser();
  return user?.deleteHomework(id);
};

export const getFullProfileInfo = async () => {
  const user = await getUser();
  const [profile, settings] = await Promise.all([
    user?.getUserInfo(),
    user?.getUserSettings(),
  ]);

  if (!profile || !settings) return;

  return { ...profile, ...settings };
};
