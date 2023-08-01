"use server";
import { headers } from "next/headers";
import { getUserByChatId } from "./database/users";
import { createClient } from "mystat-api";
import { getPersistedClient, persistClient } from "./database/store";
import { cache } from "react";

export const getUserApiClient = async () => {
  const chatIdStr = headers().get("x-chat-id");

  if (!chatIdStr) return null;

  const chatId = parseInt(chatIdStr);

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
  const user = await getUserApiClient();
  return user?.getUserInfo();
});

export const getAllNews = cache(async () => {
  const user = await getUserApiClient();
  return user?.getLatestNews();
});

export const getNewsDetails = cache(async (id: number) => {
  const user = await getUserApiClient();
  return user?.getNewsDetails(id);
});

export const getFutureExams = cache(async () => {
  const user = await getUserApiClient();
  return user?.getFutureExams();
});

export const getAllExams = cache(async () => {
  const user = await getUserApiClient();
  return user?.getAllExams();
});

export const getGroupLeaders = cache(async () => {
  const user = await getUserApiClient();
  return user?.getGroupLeaders();
});

export const getStreamLeaders = cache(async () => {
  const user = await getUserApiClient();
  return user?.getStreamLeaders();
});

export const getUserSettings = cache(async () => {
  const user = await getUserApiClient();
  return user?.getUserSettings();
});

export const getReviews = cache(async () => {
  const user = await getUserApiClient();
  return user?.getReviews();
});

export const uploadHomework = async ({
  id,
  answerText,
}: {
  id: number;
  answerText: string;
}) => {
  const user = await getUserApiClient();
  return user?.uploadHomework({ homeworkId: id, answerText });
};

export const deleteHomework = async (id: number) => {
  const user = await getUserApiClient();
  return user?.deleteHomework(id);
};

export const getFullProfileInfo = cache(async () => {
  const user = await getUserApiClient();
  const profile = await user?.getUserInfo();
  const settings = await user?.getUserSettings();

  if (!profile || !settings) return;

  return { ...profile, ...settings };
});
