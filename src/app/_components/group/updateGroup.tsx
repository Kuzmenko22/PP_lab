"use client";

import React from "react";

export default function UpdateGroupForm({ group, updateGroup }: {group: {
    id?: string;
    name?: string;
  };
  updateGroup: (formData: FormData) => void;}) {
  return (
    <form action={updateGroup} className="form-control">
      <div className="flex max-w-xs flex-col space-y-2">
        <input type="hidden" name="id" defaultValue={group.id ?? ""} />
        <label>Название</label>
        <input
          type="text"
          name="name"
          required
          className="input input-bordered"
          defaultValue={group.name ?? ""}
        />
        <button type="submit" className="btn btn-primary">
          Обновить
        </button>
      </div>
    </form>
  );
}
