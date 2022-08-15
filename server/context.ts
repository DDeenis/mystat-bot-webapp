import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import userStore from "./store/userStore";

// TODO: remove this?
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  async function getUser() {
    const userIdRaw = opts?.req.headers.userId;
    if (userIdRaw && typeof userIdRaw === "string") {
      const userId = parseInt(userIdRaw);

      const userFromStore = userStore.get(userId);

      // let userFromDb: IUser | undefined;
      // if (!userFromStore) {
      //   userFromDb = await getUserByChatId(userId);
      // }

      return userFromStore;
    }
    return null;
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
