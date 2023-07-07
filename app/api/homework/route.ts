import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserByChatId } from "../../../server/database/users";
import { cookies } from "next/headers";
import { createClient } from "mystat-api";

const requestSchema = z.object({
  hwStatus: z.number().min(0).max(5),
  hwType: z.number().min(0).max(1),
  page: z.number(),
});

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

  const apiClient = await createClient({
    loginData: user,
    language: "ru",
  });

  return apiClient;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const hwStatus = url.searchParams.get("hwStatus"),
    hwType = url.searchParams.get("hwType"),
    page = url.searchParams.get("page");
  const body = {
    hwStatus: hwStatus ? parseInt(hwStatus) : hwStatus,
    hwType: hwType ? parseInt(hwType) : hwType,
    page: page ? parseInt(page) : page,
  };

  const requestValidationData = requestSchema.safeParse(body);

  if (!requestValidationData.success) {
    return NextResponse.json(
      { message: "Invalid request body provided" },
      { status: 400 }
    );
  }

  const { data } = requestValidationData;

  const mystat = await getUser();

  if (!mystat) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const res = await mystat.getHomeworkList(
    data.page,
    data.hwStatus,
    data.hwType
  );

  return NextResponse.json(res, { status: 200 });
}

const uploadSchema = z.object({
  id: z.number(),
  answerText: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const requestValidationData = uploadSchema.safeParse(body);

  if (!requestValidationData.success) {
    return NextResponse.json(
      { message: "Invalid request body provided" },
      { status: 400 }
    );
  }

  const { data } = requestValidationData;

  const user = await getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json(
    user.uploadHomework({ homeworkId: data.id, answerText: data.answerText }),
    {
      status: 201,
    }
  );
}

const deleteSchema = z.object({
  id: z.number(),
});

export async function DELETE(req: Request) {
  const body = await req.json();
  const requestValidationData = deleteSchema.safeParse(body);

  if (!requestValidationData.success) {
    return NextResponse.json(
      { message: "No homework id provided" },
      { status: 400 }
    );
  }

  const { data } = requestValidationData;

  const user = await getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const result = await user.deleteHomework(data.id);
  return NextResponse.json({}, { status: 204 });
}
