"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import { api } from "../../../trpc/react";

export function Grade({
  taskId,
  studentId,
}: {
  taskId: string;
  studentId: string;
}) {
  const valRef = useRef<HTMLInputElement>(null);
  const grades = api.grade.getByTask.useQuery({ taskId });
  const set = api.grade.create.useMutation();
  console.log(grades.data);
  const onSetHandler = () => {
    set.mutate({ taskId, studentId, value: Number(valRef.current?.value) });
  };

  return (
    <>
      <input
        ref={valRef}
        type="number"
        name="value"
        defaultValue={0}
        className="w-8 px-px"
      />
      <button type="submit" onClick={onSetHandler}>
        <CheckIcon className="w-6" />
      </button>
    </>
  );
}
