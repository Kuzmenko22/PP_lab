import { TaskType } from "@prisma/client";
import React from "react";
import { createTask } from "~/app/api/action/task";


export function AddTask({ taskType }: { taskType: TaskType }) {  
  return (
    <form action={createTask} className="form-control">
      <div className="flex max-w-xs flex-col space-y-2">
        <input type="hidden" name="taskTypeId" defaultValue={taskType.id} />
        <label>Название</label>
        <input
          type="text"
          name="name"
          required
          className="input input-bordered"
          defaultValue={taskType.name ?? ""}
        />
        <label>Максимальная оценка</label>
        <input
          type="number"
          name="value"
          required
          className="input input-bordered"
          defaultValue={1}
        />
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </div>
    </form>
  );
}
