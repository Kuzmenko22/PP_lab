"use client";

import Link from "next/link";

export function TaskEditAdminView({ task, taskType }: { task: any, taskType: any }) {
  return (
    <main>
      <Link href={`/taskType/${task.taskTypeId}`} className="btn btn-primary">
        {taskType?.name}
      </Link>
      <form action="/api/action/task/updateTask" className="form-control">
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
          <button type="submit" className="btn btn-primary">Обновить</button>
        </div>
      </form>

      <table className="m-4 box-border">
        <tbody>
          {task.squades.map((squad: any, index: number) => (
            <tr key={squad.id}>
              <td>
                <Link href={`/squad/${squad.id}`} className="btn btn-primary">
                  {"Поток " + (index + 1)}
                </Link>
              </td>
              <td>
                {index !== 0 && (
                  <form action="/api/action/task/deleteUserTask" className="form-control">
                    <input type="hidden" name="id" defaultValue={squad.id ?? ""} />
                    <button type="submit" className="btn btn-primary">Удалить поток</button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form action="/api/action/task/addUserTask" className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={task.id ?? ""} />
          <button type="submit" className="btn btn-primary">Добавить поток</button>
        </div>
      </form>

      <form action="/api/action/task/deleteTask" className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={task.id ?? ""} />
          <input type="hidden" name="taskTypeId" defaultValue={task.taskTypeId ?? ""} />
          <button type="submit" className="btn btn-primary">Удалить</button>
        </div>
      </form>
    </main>
  );
}
