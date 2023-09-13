import { NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getUserApiClient } from "../../../server/actions";
import {
  homeworkStatusToSlug,
  homeworkTypeToSlug,
} from "../../../utils/homework";
import { HomeworkStatus, HomeworkType } from "mystat-api";

const requestSchema = z.object({
  hwStatus: z.number().min(0).max(5),
  hwType: z.number().min(0).max(1),
  page: z.number(),
});

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

  const mystat = await getUserApiClient();

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

  const user = await getUserApiClient();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const result = await user.uploadHomework({
    homeworkId: data.id,
    ...data,
  });

  // revalidatePath(`/homework/list/[status]/[type]/[page]`);

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

  const user = await getUserApiClient();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const result = await user.deleteHomework(data.id);

  // revalidatePath(`/homework/list/[status]/[type]/[page]`);

  return NextResponse.json({ result }, { status: 200 });
}
