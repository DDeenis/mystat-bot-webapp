import { env } from "../../env.mjs";
import { supabase } from "./database";
import { IUser } from "./types";

const usersTable = "users";
const baseEndpoint = `${env.SUPABASE_URL}/rest/v1`;

export const getUserByChatId = async ({
  chatId,
  cache = true,
}: {
  chatId: number;
  cache?: boolean;
}): Promise<IUser | undefined> => {
  const data = await fetch(
    `${baseEndpoint}/${usersTable}?select=*&chatId=eq.${chatId}`,
    {
      headers: {
        apikey: env.SUPABASE_KEY!,
        "app-secret": env.APP_SECRET!,
      },
      cache: cache ? "force-cache" : "no-cache",
    }
  ).then((res) => res.json());

  return data?.[0];
};

export const getAccessToken = async (token: string) => {
  const response = await supabase
    .from("appTokens")
    .select("*")
    .eq("token", token);
  const data = response.data?.[0] as
    | { chatId: number; expires: number }
    | undefined;

  if (!data || response.error) {
    console.error(response.error);
    return null;
  }

  return {
    chatId: data.chatId,
    token,
    isExpired: Date.now() > data.expires,
  };
};

export const createAccessToken = async (chatId: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 60 * 60 * 1000);
  const data = await supabase
    .from("appTokens")
    .upsert({
      chatId,
      token: crypto.randomUUID(),
      // @ts-expect-error
      expires: expires.toISOString().toLowerCase("zh-TW"),
    })
    .select("token");

  return data.data?.[0] as { token: string } | undefined;
};

export const deleteAccessToken = async (chatId: number) => {
  const data = await supabase.from("appTokens").delete().eq("chatId", chatId);
  return Boolean(data.error);
};

export const isUserExist = async (chatId: number): Promise<boolean> => {
  try {
    const result = await getUserByChatId({ chatId, cache: false });
    return Boolean(result);
  } catch (error) {
    console.error(error);
  }

  return false;
};
