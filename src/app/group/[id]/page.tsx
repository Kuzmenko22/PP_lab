import React, { Suspense } from "react";
import GroupUser from "~/app/_components/group/groupUser";
import { deleteGroup, updateGroup } from "~/app/api/action/group";
import UserSearch from "~/app/ui/userSearch";
import { db } from "~/server/db";

export default async function Page(props: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ query?: string }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const params = await props.params;
  const group = await db.group.findUnique({ where: { id: params.id } });


  if (!group)
    return (
      <main>
        <h1>User not found</h1>
      </main>
    );

  return (
    <main>
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
      <form action={deleteGroup} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={group.id ?? ""} />
          <button type="submit" className="btn btn-primary">
            Удалить
          </button>
        </div>
      </form>
      <UserSearch query={query} id_group={group.id} />
      <Suspense fallback={<div>Loading...</div>}>
          <GroupUser group={group} />
      </Suspense>
    </main>
  );
}