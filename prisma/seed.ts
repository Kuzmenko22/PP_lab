import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    email: "ian@example.com",
    firstname: "Ян",
    surname: "Непомнящий",
    group: "Группа 1",
  },
  {
    email: "vlad@example.com",
    firstname: "Владислав",
    surname: "Артемьев",
    group: "Группа 1",
  },
  {
    email: "dan@example.com",
    firstname: "Даниил",
    surname: "Дубов",
    group: "Группа 1",
  },
  {
    email: "sash@example.com",
    firstname: "Александр",
    surname: "Грищук",
    group: "Группа 1",
    subgroup: 2,
  },
  {
    email: "ern@example.com",
    firstname: "Эрнесто",
    surname: "Инаркиев",
    group: "Группа 2",
  },
];

const groups = [
  {
    name: "Группа 1",
  },
  {
    name: "Группа 2",
  },
  {
    name: "Группа 3",
  },
  {
    name: "Группа 4",
  },
  {
    name: "Группа 5",
  },
];

const taskTypes = [
  { name: "Лекция" },
  { name: "Лабораторное занятие" },
  { name: "Лабораторная работа" },
];

const tasks = [
  "Лекция. Введение",
  "Лекция. Среда разработки",
  "Лекция. Время и пространство",
];

const squads = [
  {
    tutor: "Дубов",
    students: [
      ["Грищук", 2],
      ["Дубов", 3],
      ["Непомнящий", null],
    ],
  },
  {
    tutor: "Грищук",
    students: [
      ["Инаркиев", 2],
      ["Дубов", 3],
      ["Непомнящий", null],
    ],
  },
];
async function main() {
  await Promise.all(
    groups.map(async (group) => {
      await prisma.group.upsert({
        where: { name: group.name },
        update: {},
        create: {
          name: group.name,
        },
      });
    }),
  );
  const groupsDB = await prisma.group.findMany();
  await Promise.all(
    users.map(async (user) => {
      const groupId = groupsDB.find((g) => g.name === user.group)?.id || "";
      // console.log(groupId);
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          groupId: groupId,
          subgroup: user.subgroup,
        },
      });
    }),
  );

  // await Promise.all(
  //   taskTypes.map(async (taskType) => {
  //     await prisma.taskType.upsert({
  //       where: { name: taskType.name },
  //       update: {},
  //       create: {
  //         name: taskType.name,
  //       },
  //     });
  //   }),
  // );

  // const lec = await prisma.taskType.findUnique({ where: { name: "Лекция" } });
  // await Promise.all(
  //   tasks.map(async (task) => {
  //     await prisma.task.upsert({
  //       where: { name: task },
  //       update: {},
  //       create: {
  //         name: task,
  //         taskTypeId: lec?.id || "",
  //       },
  //     });
  //   }),
  // );

  // const lec1 = await prisma.task.findUnique({
  //   where: { name: "Лекция. Введение" },
  // });
  // await prisma.squad.deleteMany({});
  // await Promise.all(
  //   squads.map(async (squad) => {
  //     const tutor = await prisma.user.findFirstOrThrow({
  //       where: { surname: squad.tutor },
  //     });
  //     const s = squad.students.map((s) => s[0]) as string[];
  //     const students = await prisma.user.findMany({
  //       where: { surname: { in: s } },
  //     });
  //     const sq = await prisma.squad.create({
  //       data: {
  //         taskId: lec1?.id || "",
  //         tutorId: tutor.id,
  //         date: new Date(),
  //       },
  //     });
  //     await Promise.all(
  //       students.map(async (student) => {
  //         await prisma.studentsOnTasks.create({
  //           data: {
  //             studentId: student.id,
  //             squadId: sq.id,
  //           },
  //         });
  //       }),
  //     );
  //   }),
  // );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
