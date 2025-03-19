import Link from "next/link";
import React from "react";
import { deleteUser, updateUser } from "~/app/api/action/user";
import { db } from "~/server/db";

export default async function Page(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const user = await db.user.findUnique({ where: { id: params.id }, include: {group: true } });

  const groupJSX = user?.group && <><label>Группа</label><Link className="btn"  href={"/group/" + user?.group.id}>{user?.group.name + "-" + user.subgroup}</Link></>;

  if (!user)
    return (
      <main>
        <h1>User not found</h1>
      </main>
    );

  return (
    <main>
      <form action={updateUser} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={user.id ?? ""} />
          <label>Электронная почта</label>
          <input
            type="email"
            name="email"
            required
            className="input input-bordered"
            defaultValue={user.email ?? ""}
          />
          <label>Имя</label>
          <input
            type="text"
            name="firstname"
            required
            className="input input-bordered"
            defaultValue={user.firstname ?? ""}
          />
          <label>Фамилия</label>
          <input
            type="text"
            name="surname"
            required
            className="input input-bordered"
            defaultValue={user.surname ?? ""}
          />
          {groupJSX}
          <button type="submit" className="btn btn-primary">
            Обновить
          </button>
        </div>
      </form>
      <form action={deleteUser} className="form-control">
        <div className="flex max-w-xs flex-col space-y-2">
          <input type="hidden" name="id" defaultValue={user.id ?? ""} />
          <button type="submit" className="btn btn-primary">
            Удалить
          </button>
        </div>
      </form>
    </main>
  );
}
