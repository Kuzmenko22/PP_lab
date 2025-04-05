import Link from "next/link";
import React from "react";
import {
  addUserTask,
  deleteTask,
  deleteUserTask,
  updateTask,
} from "../../api/action/task";
import { db } from "~/server/db";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const task = await db.task.findUnique({
    where: { id: params.id },
    include: { squades: true },
  });
  const taskType = await db.taskType.findUnique({
    where: { id: task?.taskTypeId },
  });

  if (!task)
    return (
      <main>
        <h1>Task not found</h1>
      </main>
    );

  return (
    <main>
      <Link href={`/taskType/${task.taskTypeId}`} className="btn btn-primary">
        {taskType?.name}
      </Link>
      <form action={updateTask} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={task.id ?? ""} />
          <label>Название</label>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered"
            defaultValue={task.name ?? ""}
          />
          <label>Максимальная оценка</label>
          <input
            type="number"
            name="value"
            required
            className="input input-bordered"
            defaultValue={task.value}
          />
          <button type="submit" className="btn btn-primary">
            Обновить
          </button>
        </div>
      </form>
      <table className="m-4 box-border">
        <tbody>
          {task.squades.map((squad, index) => (
            <tr key={squad.id}>
              <td>
                <Link href={`/squad/${squad.id}`} className="btn btn-primary">
                  {"Поток " + (index + 1)}
                </Link>
              </td>
              <td>
                {index !== 0 && (
                  <form action={deleteUserTask} className="form-control">
                    <input
                      type="hidden"
                      name="id"
                      defaultValue={squad.id ?? ""}
                    />
                    <button type="submit" className="btn btn-primary">
                      Удалить поток
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action={addUserTask} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={task.id ?? ""} />
          <button type="submit" className="btn btn-primary">
            Добавить поток
          </button>
        </div>
      </form>
      <form action={deleteTask} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={task.id ?? ""} />
          <input
            type="hidden"
            name="taskTypeId"
            defaultValue={task.taskTypeId ?? ""}
          />
          <button type="submit" className="btn btn-primary">
            Удалить
          </button>
        </div>
      </form>
    </main>
  );
}
