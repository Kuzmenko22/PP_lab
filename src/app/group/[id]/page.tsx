import React, { Suspense } from "react";
import GroupUser from "~/app/_components/group/groupUser";
import { deleteGroup, updateGroup } from "~/app/api/action/group";
import UserSearch from "~/app/ui/userSearch";
import { db } from "~/server/db";
import DeleteGroup from "~/app/_components/group/deleteGroup";
import UpdateGroupForm from "~/app/_components/group/updateGroup";

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
      <UpdateGroupForm group={group} updateGroup={updateGroup} />
        <DeleteGroup id={group.id} />
        <UserSearch query={query} id_group={group.id} />
        <Suspense fallback={<div>Loading...</div>}>
          <GroupUser group={group} />
        </Suspense>
      </main>
    );
  }