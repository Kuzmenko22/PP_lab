/*"use client"
import React, { useEffect } from "react";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Group } from "@prisma/client";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function GroupTable({ page, size }: { page?: number, size?: number }) {
  const [groupNames, setGroupNames] = React.useState<string[]>([]);
 
  const url = `/api/group?size=${size || 3}&page=${page || 1}`;

  const {isPending, isError, data, error} = useQuery({
    queryKey: ["groups", page, size],
    queryFn: async () => {
      const res = await fetch(url);
      const groups = await res.json();
      return groups;
    },
  });

  /*const putMutation = useMutation({
//     mutationFn: async (group: Group) => {
//       const response = await fetch(`/api/group/${group.id}`, {
//         method: "PUT",
//         body: JSON.stringify(group),
//       });
//       return response.json();
//     },
//   });

  useEffect(() => {
    if (data) {
      const names = data.map((u: Group) => u.name);
      setGroupNames(names);
    }
  }, [data]);*/

  /*if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const groups: Group[] = data || []

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
              <td className="px-2"><td className="px-2">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Имя группы"
                onChange={(e) => handleEditGroup(index, e.target.value)}
                value={groupNames[index] ?? ""}
              /></td>
              <td className="px-2">
              <button
                onClick={() => handleChangeName(u.id, groupNames[index] ?? "")}
              >
                <CheckIcon className="w-6" />
              </button>
            </td>
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
}*/

"use client";

import React, { useEffect } from "react";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Group } from "@prisma/client";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function GroupTable({
  page,
  size,
}: {
  page?: number;
  size?: number;
}) {
  const [groupNames, setGroupNames] = React.useState<string[]>([]);
  const queryClient = useQueryClient();

  const url = `/api/group?size=${size || 3}&page=${page || 1}`;

  const {isPending, isError, data, error } = useQuery({
    queryKey: ["groups", page, size],
    queryFn: async () => {
      const res = await fetch(url);
      const groups = await res.json();
      return groups;
    },
  });

  const putMutation = useMutation({
    mutationFn: async (group: Group) => {
      const response = await fetch(`/api/group/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] }); 
    },
  });

  /*const putMutation = useMutation({
         mutationFn: async (group: Group) => {
           const response = await fetch(`/api/group/${group.id}`, {
             method: "PUT",
             body: JSON.stringify(group),
           });
           return response.json();
         },
       });*/

  useEffect(() => {
    if (data) {
      const names = data.map((u: Group) => u.name);
      setGroupNames(names);
    }
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const groups: Group[] = data || [];

  function handleChangeName(id: string, newName: string) {
    putMutation.mutate({ id, name: newName });
  }

  function handleEditGroup(index: number, name: string) {
    setGroupNames((prev: string[]) => [
      ...prev.slice(0, index),
      name,
      ...prev.slice(index + 1),
    ]);
  }

  return (
    <table className="m-4 box-border">
      <thead>
        <tr>
          <th>Название</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {groups.map((u, index) => (
          <tr key={u.id}>
            <td className="px-2">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Имя группы"
                onChange={(e) => handleEditGroup(index, e.target.value)}
                value={groupNames[index] ?? ""}
              />
            </td>
            <td className="px-2">
              <button
                onClick={() => handleChangeName(u.id, groupNames[index] ?? "")}
              >
                <CheckIcon className="w-6" />
              </button>
            </td>
            <td className="px-2">
              <Link href={`/group/${u.id}`}>
                <PencilSquareIcon className="w-4" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
