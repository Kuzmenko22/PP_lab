import React from "react";
import { db } from "~/server/db";
import Pagination from "../ui/pagination";
import TaskTypeTable from "../_components/taskType/table";
import { AddTaskGroup } from "../_components/taskType/add";

export default async function Page(props: {
  searchParams?: Promise<{
    size?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || 3;

  const count = await db.taskType.count();
  const taskGroups = await db.taskType.findMany({
    skip: (page - 1) * size,
    take: size,
  });

  const pages = Math.ceil(Number(count) / size);

  return (
    <div>
      <AddTaskGroup />
      <TaskTypeTable tasks={taskGroups} />
      <Pagination totalPages={pages} />
    </div>
  );
}
