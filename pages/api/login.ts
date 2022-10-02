import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByChatId } from "../../server/database/users";
import userStore from "../../server/store/userStore";

type ResponseData = {
  logged: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.body) {
    res.status(400).json({ logged: false, message: "No chatId provided" });
    return;
  }

  const chatId = parseInt(req.body);
  const user = await getUserByChatId(chatId);

  if (user) {
    userStore.set(user.chatId, {
      username: user.username,
      password: user.password,
    });

    res.status(200).json({ logged: Boolean(user) });
    return;
  }

  res.status(404).json({ logged: false, message: "User not found" });
}
