import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserApiClient } from "../../../server/actions";
import type { ScheduleEntry } from "mystat-api";

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

  const scheduleMonths = await user.getMonthSchedule(date);

  if (!scheduleMonths) {
    return NextResponse.json(
      { message: "Failed to get schedule" },
      { status: 500 }
    );
  }

  const scheduleMonthsGrouped: Record<string, ScheduleEntry[]> = {};

  for (let i = 0; i < scheduleMonths.length; i++) {
    const element = scheduleMonths[i];
    const group = scheduleMonthsGrouped[element.date] ?? [];
    group.push(element);
    scheduleMonthsGrouped[element.date] = group;
  }

  return NextResponse.json(scheduleMonthsGrouped, { status: 200 });
}
