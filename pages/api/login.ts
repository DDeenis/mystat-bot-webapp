import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByChatId } from "../../server/database/database";

type ResponseData = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const chatId = req.body;
  const user = await getUserByChatId(chatId);

  res.status(200).json({ message: user?.username ?? "ERROR" });
}
