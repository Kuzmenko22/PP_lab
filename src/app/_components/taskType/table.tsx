import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { TaskType } from "@prisma/client";
import Link from "next/link";

export default function TaskTypeTable({ tasks }: { tasks: TaskType[] }) {
  return (
    <>
      <table className="m-4 box-border">
        <thead>
          <tr>
            <th>Название</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((u) => (
            <tr key={u.id}>
              <td className="px-2">{u.name}</td>
              <td className="px-2">
                <Link href={`/taskType/${u.id}`}>
                  <PencilSquareIcon className="w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}