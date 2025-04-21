import React from "react";
import { AddTask } from "~/app/_components/task/add";
import { TaskTable } from "~/app/_components/task/table";
import { deleteTaskType, updateTaskType } from "~/app/api/action/taskType";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { TaskTypeEditor } from "~/app/_components/taskType/modeAdmin";

export default async function Page(props: { 
  params: Promise<{ id: string }>,
}) {
  const params = await props.params;
  const taskType  = await db.taskType.findUnique({ where: { id: params.id } });
  const tasks = await db.task.findMany({ where: { taskTypeId: taskType?.id } });

  if (!taskType)
    return (
      <main>
        <h1>Task group not found</h1>
      </main>
    );

    const role = (await auth())?.user.role
    const mode = role === "ADMIN" || role === "TUTOR"

  /*if (mode) return (
    <main>
      <form action={updateTaskType} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={taskType.id ?? ""} />
          <label>Название</label>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered"
            defaultValue={taskType.name ?? ""}
          />
          <button type="submit" className="btn btn-primary">
            Обновить
          </button>
        </div>
      </form>
      <form action={deleteTaskType} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={taskType.id ?? ""} />
          <button type="submit" className="btn btn-primary">
            Удалить
          </button>
        </div>
      </form>
      <AddTask taskType={taskType} />
      <TaskTable tasks={tasks} />
    </main>
  );*/
  if (mode) {
    return <TaskTypeEditor taskType={taskType} tasks={tasks} />;
  }
  return (
    <main>
      <h1>{taskType.name}</h1>
      <TaskTable tasks={tasks} />
    </main>
  );
}
