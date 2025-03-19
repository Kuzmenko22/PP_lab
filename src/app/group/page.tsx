import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./../_components/navbar";
import { SigninLink } from "./../_components/signlink";
import { db } from "~/server/db";
import { AddUser } from "../_components/user/addUser";
import UserTable from "../_components/user/userTable";
import Pagination from "../ui/pagination";
import GroupTable from "../_components/group/groupTable";
import { AddGroup } from "../_components/group/addGroup";


export default async function Page(props: {
  searchParams?: Promise<{
    size?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || 3;

  const count = await db.group.count();
  const groups = await db.group.findMany({
    skip: (page - 1) * size,
    take: size,
  });
  const pages = Math.ceil(Number(count) / size);

  return (
    <>
      <h1>Group page</h1>
      <AddGroup />
      <GroupTable groups={groups} />
      <Pagination totalPages={pages} />
    </>
  );
}
