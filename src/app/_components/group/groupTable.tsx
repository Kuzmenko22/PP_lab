import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Group } from "@prisma/client";
import Link from "next/link";

export default function GroupTable({ groups }: { groups: Group[] }) {
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
          {groups.map((u) => (
            <tr key={u.id}>
              <td className="px-2">{u.name}</td>
              <td className="px-2">
                <Link href={`/group/${u.id}`}>
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