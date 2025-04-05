"use client";

import React from "react";
import { api } from "../../../trpc/react";
import UserMinusIcon from "@heroicons/react/24/outline/UserMinusIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

export function Students({
  taskId,
  squadId,
}: {
  taskId: string;
  squadId: string;
}) {
  //const h = api.post.hello.useQuery({ text: "world" });
  //console.log("\n\nTRPC\n\n", h.data);
  const [search, setSearch] = React.useState<string>("");
  const gradeInputRefs = React.useRef<HTMLInputElement[]>([]);
  const students =
    api.user.getStudentBySquad.useQuery({ squadId: squadId }).data ?? [];
  const grades = api.grade.getByTask.useQuery({ taskId }).data ?? [];
  const r = api.user.getByQuery.useQuery({ query: search }).data;
  const addStudentMutation = api.squad.addStudent.useMutation();
  const deleteStudentMutation = api.squad.deleteStudent.useMutation();
  const createGradeMutation = api.grade.create.useMutation();
  const utils = api.useUtils();

  const studentsWithGrades = students.map((s) => {
    const g = grades.find((g) => g.studentId === s.id);
    return { ...s, value: g?.value ?? 0 };
  });
  console.log(studentsWithGrades);

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const handleAdd = () => {
    if (r) {
      addStudentMutation.mutate(
        { squadId: squadId, studentId: r.id },
        {
          onSuccess: () => {
            utils.user.getStudentBySquad.invalidate();
          },
        },
      );
    }
  };
  const handleDelete = (studentId: string) => {
    deleteStudentMutation.mutate(
      {
        squadId: squadId,
        studentId: studentId,
      },
      {
        onSuccess: () => {
          utils.user.getStudentBySquad.invalidate();
        },
      },
    );
  };

  const handleSetGrades = (index: number) => {
    const values = gradeInputRefs.current[index]?.value;
    const studentId = students[index]?.id;
    if (values && studentId)
      createGradeMutation.mutate(
        {
          taskId,
          studentId: studentId,
          value: Number(values),
        },
        {
          onSuccess: () => {
            utils.grade.getByTask.invalidate();
          },
        },
      );
  };
  return (
    <div>
      <table className="m-4 box-border">
        <tbody>
          {studentsWithGrades.map((s, index) => (
            <tr key={s.id}>
              <td className="px-2">{s?.firstname}</td>
              <td className="px-2">{s?.surname}</td>
              <td>
                <button type="submit" onClick={() => handleDelete(s.id)}>
                  <UserMinusIcon className="w-6" />
                </button>
              </td>
              <td>
                <input
                  ref={(el) => {
                    if (el) gradeInputRefs.current[index] = el;
                  }}
                  type="number"
                  name="value"
                  defaultValue={s.value}
                  className="w-8 px-px"
                />
                <button onClick={() => handleSetGrades(index)}>
                  <CheckIcon className="w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="relative flex max-w-xs flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={"Имя пользователя"}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      {search && r && (
        <button onClick={handleAdd}>
          Добавить {r?.firstname} {r?.surname}
        </button>
      )}
    </div>
  );
}
