import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserByChatId } from "../../../server/database/users";
import MystatAPI from "mystat-api";

const getUser = async () => {
  const chatIdStr = cookies().get("chatId")?.value;
  if (!chatIdStr) {
    return;
  }

  const chatId = parseInt(chatIdStr);
  const user = await getUserByChatId({ chatId });

  if (!user) {
    return;
  }

  const api = new MystatAPI(user);
  await api._updateAccessToken();
  return api;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  //   const dateStr = z.string().datetime().safeParse(url.searchParams.get("date"));
  const dateStr = z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}/)
    .safeParse(url.searchParams.get("date"));

  if (!dateStr.success) {
    console.log(dateStr.error);
    return NextResponse.json({ message: "Invalid date" }, { status: 400 });
  }

  const date = new Date(dateStr.data);
  const user = await getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const schedule = await user.getScheduleByDate(date);
  return NextResponse.json(schedule, { status: 200 });
}