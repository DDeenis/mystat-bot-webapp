import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByChatId } from "../../server/database/database";
import userStore from "../../server/store/userStore";

type ResponseData = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const chatId = parseInt(req.body);
  const user = await getUserByChatId(chatId);

  if (user) {
    userStore.set(user.chatId, {
      username: user.username,
      password: user.password,
    });
  }

  res.status(200).json({ message: user?.username ?? "ERROR" });
}
