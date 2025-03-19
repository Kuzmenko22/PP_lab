import { Group, User } from "@prisma/client";
import { db } from "~/server/db";
import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { deleteUserFromGroup } from "~/app/api/action/group";

export default async function GroupUser({ group }: { group: Group }) {
    const users = await db.user.findMany({ where: { groupId: group.id } });

    return (
        <UserTable users={users} id_group={group.id} />
    );
}

function UserTable({ users, id_group }: { users: User[]; id_group: string }) {
    return (
        <>
            <table className="m-4 box-border">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Почта</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-2">{user.firstname}</td>
                            <td className="px-2">{user.surname}</td>
                            <td className="px-2">{user.email}</td>
                            <td className="px-2">
                                <form action={deleteUserFromGroup} className="form-control">
                                    <div className="flex max-w-xs flex-col space-y-2">
                                        <input
                                            type="hidden"
                                            name="id_student"
                                            defaultValue={user.id}
                                        />
                                        <input
                                            type="hidden"
                                            name="id_group"
                                            defaultValue={id_group}
                                        />
                                        <button type="submit">
                                            <UserMinusIcon className="w-6" />
                                        </button>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <Link href={`/user/${user.id}`}>
                                    <PencilSquareIcon className="w-6" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}