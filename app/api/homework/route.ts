import { NextResponse } from "next/server";
import { z } from "zod";
import { getUserByChatId } from "../../../server/database/users";
import { headers } from "next/headers";
import { createClient } from "mystat-api";
import {
  getPersistedClient,
  persistClient,
} from "../../../server/database/store";
import { revalidatePath } from "next/cache";

const requestSchema = z.object({
  hwStatus: z.number().min(0).max(5),
  hwType: z.number().min(0).max(1),
  page: z.number(),
});

const getUser = async () => {
  const chatIdStr = headers().get("x-chat-id");
  if (!chatIdStr) {
    return;
  }

  const chatId = parseInt(chatIdStr);
  const user = await getUserByChatId({ chatId });

  if (!user) {
    return;
  }

  const persistedClient = await getPersistedClient(chatId);

  if (persistedClient) return persistedClient;

  const apiClient = await createClient({
    loginData: {
      username: user.username,
      password: user.password,
    },
  });
  persistClient(chatId, apiClient.clientData);

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

  const res = await mystat.getHomeworkList({
    page: data.page,
    status: data.hwStatus,
    type: data.hwType,
  });

  return NextResponse.json(res, { status: 200 });
}

const uploadSchema = z.union([
  z.object({
    id: z.number(),
    answerText: z.string().trim().nonempty(),
    file: z.null(),
  }),
  z.object({
    id: z.number(),
    answerText: z.null(),
    file: z.custom<File>(),
  }),
  z.object({
    id: z.number(),
    answerText: z.string().trim().nonempty(),
    file: z.custom<File>(),
  }),
]);

export async function POST(req: Request) {
  const formData = await req.formData();
  const _id = formData.get("id");
  const _answerText = formData.get("answerText");
  const _file = formData.get("file");

  const body = {
    id: _id ? parseInt(_id as string) : null,
    answerText: _answerText,
    file: _file,
  };

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

  const result = await user.uploadHomework({
    homeworkId: data.id,
    ...data,
  });

  revalidatePath("/homework");

  return NextResponse.json(result, {
    status: 201,
  });
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
  revalidatePath("/homework");
  return NextResponse.json({ result }, { status: 204 });
}
