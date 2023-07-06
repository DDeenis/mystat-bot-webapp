import { getUserByChatId } from "../../../server/database/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const chatIdStr = await req.text();
  if (!chatIdStr) {
    return NextResponse.json(
      { logged: false, message: "No chatId provided" },
      { status: 400 }
    );
  }

  const chatId = parseInt(chatIdStr);
  const user = await getUserByChatId({ chatId, cache: false });

  if (user) {
    return NextResponse.json(
      { logged: Boolean(user) },
      { status: 200, headers: { "Set-Cookie": `chatId=${chatId}` } }
    );
  }

  return NextResponse.json(
    { logged: false, message: "User not found" },
    { status: 404 }
  );
}
