import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getUserByChatId } from "./database/database";
import userStore from "./store/userStore";

// TODO: remove this?
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  async function getUser() {
    if (!opts?.req.cookies) return;

    const chatIdRaw = opts?.req.cookies?.["chatId"];

    if (chatIdRaw) {
      const chatId = parseInt(chatIdRaw);

      if (!userStore.has(chatId)) {
        const userFromDb = await getUserByChatId(chatId);

        if (userFromDb) {
          userStore.set(chatId, { ...userFromDb });
        }
      }

      const user = userStore.get(chatId);

      return user;
    }

    return undefined;
  }

  const user = await getUser();

  return {
    user,
  };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}