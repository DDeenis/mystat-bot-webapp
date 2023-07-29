import { env } from "../../env.mjs";
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

export const isUserExist = async (chatId: number): Promise<boolean> => {
  try {
    const result = await getUserByChatId({ chatId, cache: false });
    return Boolean(result);
  } catch (error) {
    console.log(error);
  }

  return false;
};
