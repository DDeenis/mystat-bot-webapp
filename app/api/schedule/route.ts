import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserApiClient } from "../../../server/actions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const dateStr = z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}/)
    .safeParse(url.searchParams.get("date"));

  if (!dateStr.success) {
    console.error(dateStr.error);
    return NextResponse.json({ message: "Invalid date" }, { status: 400 });
  }

  const date = new Date(dateStr.data);
  const user = await getUserApiClient();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  const schedule = await user.getScheduleByDate(date);
  return NextResponse.json(schedule, { status: 200 });
}
