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
  });

export const UserRouter = typeof mystatRouter;
