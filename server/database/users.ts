import { supabase } from "./database";
import { IUser } from "./types";

const usersTable = "users";

export const getUserByChatId = async (
  chatId: number
): Promise<IUser | undefined> => {
  const { data, error } = await supabase
    .from(usersTable)
    .select("*")
    .eq("chatId", chatId);

  if (error) throw error;

  return data?.[0];
};

export const isUserExist = async (chatId: number): Promise<boolean> => {
  try {
    const result = await getUserByChatId(chatId);
    return Boolean(result);
  } catch (error) {
    console.log(error);
  }

  return false;
};
