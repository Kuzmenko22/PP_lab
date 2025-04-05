import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";

type DeleteData = Parameters<typeof db.studentsOnTasks.delete>[0]["where"];

export const squadRouter = createTRPCRouter({
  addStudent: protectedProcedure
    .input(
      z.object({
        squadId: z.string(),
        studentId: z.string()        
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.studentsOnTasks.create({
        data: input,
      });
    }),
    deleteStudent: protectedProcedure
    .input(
      z.object({
        squadId: z.string(),
        studentId: z.string()        
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deleteData: DeleteData = { 
        studentId_squadId: 
        { 
          squadId: input.squadId, 
          studentId: input.studentId 
        } 
      };
      return ctx.db.studentsOnTasks.delete({
        where: deleteData,
      });
    }),
});