/*import React from "react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { createGroup } from "~/app/api/action/group";

export function AddGroup() {
    return (
      <details className="collapse bg-base-100" tabIndex={0}>
        <summary className="collapse-title text-xl font-medium">
          <FolderPlusIcon className="w-6" />
        </summary>
        <form action={createGroup} className="collapse-content form-control">
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
  }*/

"use client";

import React from "react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddGroup() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/group", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Ошибка при добавлении группы");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] }); 
    },
  });

  return (
    <details className="collapse bg-base-100" tabIndex={0}>
      <summary className="collapse-title text-xl font-medium">
        <FolderPlusIcon className="w-6" />
      </summary>
      <form
        className="collapse-content form-control"
        action={async (formData) => mutation.mutate(formData)}
      >
        <div className="flex flex-col max-w-xs space-y-2">
          <label>Название</label>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered"
          />
          <button type="submit" className="btn btn-primary">
            Добавить
          </button>
        </div>
      </form>
    </details>
  );
}