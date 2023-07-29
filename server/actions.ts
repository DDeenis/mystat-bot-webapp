"use server";
import { cookies } from "next/headers";
import { getUserByChatId } from "./database/users";
import { createClient } from "mystat-api";
import { getPersistedClient, persistClient } from "./database/store";
import { cache } from "react";

const getUser = async () => {
  const chatIdStr = cookies().get("chatId");

  if (!chatIdStr?.value) return null;

  const chatId = parseInt(chatIdStr.value);

  const userFromDb = await getUserByChatId({ chatId });
  if (!userFromDb) throw `User with id ${chatId} not registered`;

  const persistedClient = await getPersistedClient(chatId);

  if (persistedClient) return persistedClient;

  const apiClient = await createClient({
    loginData: {
      username: userFromDb.username,
      password: userFromDb.password,
    },
  });
  persistClient(chatId, apiClient.clientData);
  return apiClient;
};

export const getProfile = cache(async () => {
  const user = await getUser();
  return user?.getUserInfo();
});

export const getAllNews = cache(async () => {
  const user = await getUser();
  return user?.getLatestNews();
});

export const getNewsDetails = cache(async (id: number) => {
  const user = await getUser();
  return user?.getNewsDetails(id);
});

export const getFutureExams = cache(async () => {
  const user = await getUser();
  return user?.getFutureExams();
});

export const getAllExams = cache(async () => {
  const user = await getUser();
  return user?.getAllExams();
});

export const getGroupLeaders = cache(async () => {
  const user = await getUser();
  return user?.getGroupLeaders();
});

export const getStreamLeaders = cache(async () => {
  const user = await getUser();
  return user?.getStreamLeaders();
});

export const getUserSettings = cache(async () => {
  const user = await getUser();
  return user?.getUserSettings();
});

export const getReviews = cache(async () => {
  const user = await getUser();
  return user?.getReviews();
});

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

export const getFullProfileInfo = cache(async () => {
  const user = await getUser();
  const profile = await user?.getUserInfo();
  const settings = await user?.getUserSettings();

  if (!profile || !settings) return;

  return { ...profile, ...settings };
});
