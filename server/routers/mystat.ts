import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, t } from "../trpc";

const userProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }

    return next();
  })
);

export const mystatRouter = router({
  mystat: router({
    profile: userProcedure.query(({ ctx }) => ctx.user?.getProfileInfo()),
    schedule: userProcedure
      .input(
        z.object({
          scheduleFor: z.enum(["day", "month"]).default("day"),
          // Passing normal date cause infinite loop, so only use toDateString()
          date: z.string(),
        })
      )
      .query(({ ctx, input: { scheduleFor, date: dateStr } }) => {
        const date = new Date(dateStr);

        if (scheduleFor === "day") {
          return ctx.user?.getScheduleByDate(date);
        }

        return ctx.user?.getMonthSchedule(date);
      }),
    homework: userProcedure
      .input(
        z.object({
          hwStatus: z.number().min(0).max(5),
          hwType: z.number().min(0).max(1),
          page: z.number(),
        })
      )
      .query(({ ctx, input: { hwStatus, hwType, page } }) => {
        return ctx.user?.getHomeworkList(hwStatus, page, hwType);
      }),
    allNews: userProcedure.query(({ ctx }) => ctx.user?.getNews()),
    newsDetails: userProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .query(({ ctx, input: { id } }) => ctx.user?.getNewsDetails(id)),
    futureExams: userProcedure.query(({ ctx }) => ctx.user?.getFutureExams()),
    allExams: userProcedure.query(({ ctx }) => ctx.user?.getExams()),
    leaders: userProcedure
      .input(
        z.object({
          list: z.enum(["group", "stream"]),
        })
      )
      .query(({ ctx, input: { list } }) => {
        if (list === "stream") {
          return ctx.user?.getStreamLeaders();
        }

        return ctx.user?.getGroupLeaders();
      }),
    profileSettings: userProcedure.query(({ ctx }) =>
      ctx.user?.getUserSettings()
    ),
    reviews: userProcedure.query(({ ctx }) => ctx.user?.getReviews()),
    uploadHw: userProcedure
      .input(
        z.object({
          id: z.number(),
          answerText: z.string(),
        })
      )
      .mutation(({ ctx, input: { id, answerText } }) =>
        ctx.user?.uploadHomework(id, answerText)
      ),
    deleteHw: userProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .mutation(({ ctx, input: { id } }) => ctx.user?.deleteHomework(id)),
  }),
});

export type UserRouter = typeof mystatRouter;
