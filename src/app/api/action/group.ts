"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

export async function createGroup(formData: FormData) {
  const fd = z
    .object({
      name: z.string(),
    })
    .parse({
      name: formData.get("name"),
    });
  await db.group.create({ data: fd });
  revalidatePath("/group");
}

export async function deleteGroup(formData: FormData) {
    const fd = z
      .object({
        id: z.string(),
      })
      .parse({
        id: formData.get("id"),
      });
    await db.group.delete({ where: { id: fd.id } });
    redirect("/group");
  }
  
  export async function updateGroup(formData: FormData) {
    const fd = z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .parse({
        id: formData.get("id"),
        name: formData.get("name"),
      });
    await db.group.update({ where: { id: fd.id }, data: fd });
    revalidatePath("/group/" + fd.id);
  }

  export async function deleteUserFromGroup(formData: FormData) {
    const fd = z
      .object({
        id_student: z.string(),
        id_group: z.string(),
      })
      .parse({
        id_student: formData.get("id_student"),
        id_group: formData.get("id_group"),
      });
    await db.group.update({
      where: { id: fd.id_group },
      data: {
        users: {
          disconnect: { id: fd.id_student },
        },
      },
    }); 
    revalidatePath("/group/" + fd.id_group); 
  }

  export async function addUserToGroup(formData: FormData) {
    const fd = z
      .object({
        id_student: z.string(),
        id_group: z.string(),
      })
      .parse({
        id_student: formData.get("id_student"),
        id_group: formData.get("id_group"),
      });
    await db.group.update({
      where: { id: fd.id_group },
      data: {
        users: {
          connect: { id: fd.id_student },
        },
      },
    }); 
    revalidatePath("/group/" + fd.id_group); 
  }