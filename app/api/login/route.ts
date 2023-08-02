import {
  createAccessToken,
  getUserByChatId,
} from "../../../server/database/users";
import { NextResponse } from "next/server";

const cookieMaxAgeSeconds = 1 * 60 * 60;

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

  if (!user) {
    return NextResponse.json(
      { logged: false, message: "User not found" },
      { status: 404 }
    );
  }

  const tokenData = await createAccessToken(chatId);

  if (!tokenData) {
    return NextResponse.json(
      { logged: false, message: "Failed to create access token" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { logged: Boolean(user) },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${tokenData.token}; Path=/; SameSite=None; Secure; HttpOnly; Max-Age=${cookieMaxAgeSeconds}`,
      },
    }
  );
}
