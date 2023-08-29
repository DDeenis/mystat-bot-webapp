import { getProfile } from "../../../server/actions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
}
