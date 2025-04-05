"use server";

import { redirect } from "next/navigation";
import { db } from "~/server/db";

export async function addTutor(formData: FormData) {
  type UpdateData = Parameters<typeof db.squad.update>[0]["data"];
  const data: UpdateData = {
    id: formData.get("squadId") as string,
    tutorId: formData.get("tutorId") as string,
  };
  await db.squad.update({
    where: { id: data.id as string },
    data: data,
  });
  redirect("/squad/" + formData.get("squadId"));
}

export async function deleteTutor(formData: FormData) {
  const id = formData.get("squadId") as string;
  await db.squad.update({
    where: { id: id },
    data: { tutorId: null },
  });
  redirect("/squad/" + id);
}

export async function addStudent(formData: FormData) {
  type CreateData = Parameters<typeof db.studentsOnTasks.create>[0]["data"];
  const data: CreateData = {
    studentId: formData.get("studentId") as string,
    squadId: formData.get("squadId") as string,
  }
  await db.studentsOnTasks.create({
    data: data,
  });
  redirect("/squad/" + formData.get("squadId"));
}

export async function deleteStudent(formData: FormData) {
  type DeleteData = Parameters<typeof db.studentsOnTasks.delete>[0]["where"];
  const data: DeleteData = {
    studentId_squadId: {
      squadId: formData.get("squadId") as string,
      studentId: formData.get("studentId") as string,
    },
  };
  await db.studentsOnTasks.delete({
    where: data,
  });
  redirect("/squad/" + formData.get("squadId"));
}
