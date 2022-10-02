import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

export const mystatRouter = createRouter()
  .middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }

    return next();
  })
  .query("profile", {
    async resolve({ ctx }) {
      return ctx.user?.getProfileInfo();
    },
  })
  .query("schedule", {
    input: z.object({
      scheduleFor: z.enum(["day", "month"]).default("day"),
      // Passing normal date cause infinite loop, so only use toDateString()
      date: z.string(),
    }),
    resolve({ ctx, input: { scheduleFor, date: dateStr } }) {
      const date = new Date(dateStr);

      if (scheduleFor === "day") {
        return ctx.user?.getScheduleByDate(date);
      }

      return ctx.user?.getMonthSchedule(date);
    },
  })
  .query("homework", {
    input: z.object({
      hwStatus: z.number().min(0).max(5),
      hwType: z.number().min(0).max(1),
      page: z.number(),
    }),
    resolve({ ctx, input: { hwStatus, hwType, page } }) {
      return ctx.user?.getHomeworkList(hwStatus, page, hwType);
    },
  })
  .query("allNews", {
    async resolve({ ctx }) {
      return ctx.user?.getNews();
    },
  })
  .query("newsDetails", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input: { id } }) {
      return ctx.user?.getNewsDetails(id);
    },
  })
  .query("futureExams", {
    async resolve({ ctx }) {
      return ctx.user?.getFutureExams();
    },
  })
  .query("allExams", {
    async resolve({ ctx }) {
      return ctx.user?.getExams();
    },
  })
  .query("leaders", {
    input: z.object({
      list: z.enum(["group", "stream"]),
    }),
    async resolve({ ctx, input: { list } }) {
      if (list === "stream") {
        return ctx.user?.getStreamLeaders();
      }

      return ctx.user?.getGroupLeaders();
    },
  })
  .query("profileSettings", {
    async resolve({ ctx }) {
      return ctx.user?.getUserSettings();
    },
  })
  .query("reviews", {
    async resolve({ ctx }) {
      return ctx.user?.getReviews();
    },
  })
  .mutation("uploadHw", {
    input: z.object({
      id: z.number(),
      answerText: z.string(),
    }),
    async resolve({ ctx, input: { id, answerText } }) {
      return ctx.user?.uploadHomework(id, answerText);
    },
  })
  .mutation("deleteHw", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input: { id } }) {
      return ctx.user?.deleteHomework(id);
    },
  });

export type UserRouter = typeof mystatRouter;
