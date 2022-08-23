import { createClient } from "@supabase/supabase-js";
import { IUser } from "./types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error("No supabase url provided");
}

if (!supabaseKey) {
  throw new Error("No supabase key provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const usersTable = "users";

export const getUserByChatId = async (
  chatId: number
): Promise<IUser | undefined> => {
  const { data, error } = await supabase
    .from(usersTable)
    .select("*")
    .eq("chatId", chatId);

  if (error) throw error;

  return data?.[0] as IUser | undefined;
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
