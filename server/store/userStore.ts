import MystatAPI from "mystat-api";
import { MystatUserData } from "mystat-api/dist/types";

type ChatId = number;

export class UserStore {
  users: Map<ChatId, MystatAPI>;

  constructor() {
    this.users = new Map<ChatId, MystatAPI>();
  }

  get(chatId?: ChatId) {
    if (!chatId) {
      return undefined;
    }

    return this.users.get(chatId);
  }

  set(chatId: ChatId, userData: MystatUserData) {
    const api = new MystatAPI(userData);
    api._updateAccessToken();
    this.users.set(chatId, api);
  }

  has(chatId: ChatId) {
    return this.users.has(chatId);
  }

  remove(chatId: ChatId) {
    this.users.delete(chatId);
  }
}

const userStore = new UserStore();

export default userStore;
