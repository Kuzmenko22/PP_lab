import React from "react";
import { AddTask } from "~/app/_components/task/add";
import { TaskTable } from "~/app/_components/task/table";
import { deleteTaskType, updateTaskType } from "~/app/api/action/taskType";
import { db } from "~/server/db";

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

  return (
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
  );
}
