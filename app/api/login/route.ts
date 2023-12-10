import { env } from "../../../env.mjs";
import { getUserByChatId } from "../../../server/database/users";
import { NextResponse } from "next/server";
import {
  createAccessToken,
  initDataToObject,
  validateUserData,
} from "../../../utils/telegram";
import PostHogClient from "../../../utils/posthogNode";

const cookieMaxAgeSeconds = 1 * 60 * 60;

export async function POST(req: Request) {
  const initData = await req.text();

  if (!initData) {
    return NextResponse.json(
      { logged: false, message: "No initData provided" },
      { status: 400 }
    );
  }

  const initDataObj = initDataToObject(initData);
  const isDataValid = await validateUserData(initDataObj, env.BOT_TOKEN);

  if (!isDataValid) {
    return NextResponse.json(
      { logged: false, message: "User data was invalid" },
      { status: 403 }
    );
  }

  const telegramUser = JSON.parse(initDataObj.user);
  const chatId = telegramUser.id;

  if (!chatId) {
    return NextResponse.json(
      { logged: false, message: "Failed to get user id" },
      { status: 400 }
    );
  }

  const user = await getUserByChatId({ chatId, cache: false });

  if (!user) {
    return NextResponse.json(
      { logged: false, message: "User not found" },
      { status: 404 }
    );
  }

  const token = await createAccessToken(chatId);

  if (!token) {
    return NextResponse.json(
      { logged: false, message: "Failed to create access token" },
      { status: 404 }
    );
  }

  const logged = Boolean(user);

  const client = PostHogClient();
  if (logged) {
    client.capture({
      distinctId: user.chatId.toString(),
      event: "user logged in",
      properties: {
        $set: { username: user.username },
      },
    });
  } else {
    client.capture({
      distinctId: chatId.toString(),
      event: "user failed to log in",
    });
  }
  await client.shutdownAsync();

  return NextResponse.json(
    { logged },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; SameSite=None; Secure; HttpOnly; Max-Age=${cookieMaxAgeSeconds}; Partitioned;`,
      },
    }
  );
}
