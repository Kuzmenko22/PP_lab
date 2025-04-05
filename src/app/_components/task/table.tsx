import React from "react";

import { Task } from "@prisma/client";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <>
    <table className="m-4 box-border">
      <thead>
        <tr>
          <th>Название</th>          
          <th>Макс.</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((u) => (
          <tr key={u.id}>
            <td className="px-2">{u.name}</td>            
            <td className="px-2">{u.value}</td>
            <td className="px-2">
              <Link href={`/task/${u.id}`}>
                <PencilSquareIcon className="w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  )

//   <div>{tasks.length}</div>;
}
