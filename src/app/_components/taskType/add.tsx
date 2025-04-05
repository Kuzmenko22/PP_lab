import React from "react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { createTaskType } from "../../api/action/taskType";

export function AddTaskGroup() {
    return (
      <details className="collapse bg-base-100" tabIndex={0}>
        <summary className="collapse-title text-xl font-medium">
          <FolderPlusIcon className="w-6" />
        </summary>
        <form action={createTaskType} className="collapse-content form-control">
          <div className="flex flex-col max-w-xs space-y-2">
            <label>Название</label>
            <input type="text" name="name" required className="input input-bordered"/>
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
          </div>
        </form>
      </details>
    );
  }