import { env } from "../../../env.mjs";
import {
  createAccessToken,
  getUserByChatId,
} from "../../../server/database/users";
import { NextResponse } from "next/server";

const cookieMaxAgeSeconds = 1 * 60 * 60;

async function validate(data: any, botToken: string) {
  const encoder = new TextEncoder();

  const checkString = await Object.keys(data)
    .filter((key) => key !== "hash")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("\n");

  // console.log("computed string:", checkString);

  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode("WebAppData"),
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );
  const secret = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(botToken)
  );
  const signatureKey = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    signatureKey,
    encoder.encode(checkString)
  );

  const hex = [...new Uint8Array(signature)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // console.log("original hash:", data.hash);
  // console.log("computed hash:", hex);

  return data.hash === hex;
}

export async function POST(req: Request) {
  const initData = await req.text();

  if (!initData) {
    return NextResponse.json(
      { logged: false, message: "No initData provided" },
      { status: 400 }
    );
  }

  const initDataObj = Object.fromEntries(new URLSearchParams(initData));
  const isDataValid = await validate(initDataObj, env.BOT_TOKEN);

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
