import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getUserByChatId } from "./database/users";
import MystatAPI from "mystat-api";

// TODO: remove this?
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  async function getUser() {
    if (!opts?.req.cookies) return;

    const chatIdRaw = opts?.req.cookies?.["chatId"];

    if (chatIdRaw) {
      const chatId = parseInt(chatIdRaw);

      const userFromDb = await getUserByChatId({ chatId });
      if (!userFromDb) return;
      const user = new MystatAPI(userFromDb);

      return user;
    }

    return undefined;
  }

  const user = await getUser();

  return {
    user,
  };
}
export type UserContext = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<UserContext>();
}
