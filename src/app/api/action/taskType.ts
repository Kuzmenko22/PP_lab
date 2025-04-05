"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

export async function createTaskType(formData: FormData) {
  const fd = z
    .object({
      name: z.string(),
    })
    .parse({
      name: formData.get("name"),
    });
  await db.taskType.create({ data: fd });
  revalidatePath("/taskType");
}

export async function updateTaskType(formData: FormData) {
  const fd = z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .parse({
      id: formData.get("id"),
      name: formData.get("name"),
    });
  await db.taskType.update({ where: { id: fd.id }, data: fd });
  revalidatePath("/taskType/" + fd.id);
}

export async function deleteTaskType(formData: FormData) {
  const fd = z
    .object({
      id: z.string(),
    })
    .parse({
      id: formData.get("id"),
    });
  await db.taskType.delete({ where: { id: fd.id } });
  redirect("/taskType");
}

