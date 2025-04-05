import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const gradeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        studentId: z.string(),
        value: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.grade.create({
        data: {
          taskId: input.taskId,
          studentId: input.studentId,
          value: input.value,
        },
      });
    }),

  getByTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      const grades = await ctx.db.grade.findMany({
        where: { taskId: input.taskId },
      });
      return grades ?? null;
    }),
});
