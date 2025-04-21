import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { isAdminOrCurrentTutor } from "~/app/api/auth/check";

export const gradeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        studentId: z.string(),
        value: z.coerce.number(),
        squadTutorId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await isAdminOrCurrentTutor(input.squadTutorId))) throw new Error("Unauthorized");
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
