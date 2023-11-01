import { SignJWT, jwtVerify } from "jose";
import { env } from "../env.mjs";

export async function hashInitData(
  data: Record<string, string>,
  botToken: string
) {
  const encoder = new TextEncoder();

  const checkString = await Object.keys(data)
    .filter((key) => key !== "hash")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("\n");

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

  return hex;
}

export async function validateUserData(
  data: Record<string, string>,
  botToken: string
) {
  const hash = await hashInitData(data, botToken);
  return data.hash === hash;
}

export function initDataToObject(initData: string) {
  return Object.fromEntries(new URLSearchParams(initData));
}

export function createAccessToken(chatId: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60;

  return new SignJWT()
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setSubject(chatId)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(env.BOT_TOKEN));
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(env.BOT_TOKEN)
    );

    return payload;
  } catch {
    return null;
  }
}
