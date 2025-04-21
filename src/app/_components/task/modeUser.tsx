// components/TaskReadOnlyView.tsx
import Link from "next/link";

export function TaskReadOnlyView({ task, taskType }: { task: any, taskType: any }) {
  return (
    <main>
      <Link href={`/taskType/${task.taskTypeId}`} className="btn btn-primary">
        {taskType?.name}
      </Link>
      <h1>{task.name}</h1>
      <table className="m-4 box-border">
        <tbody>
          {task.squades.map((squad: any, index: number) => (
            <tr key={squad.id}>
              <td>
                <Link href={`/squad/${squad.id}`} className="btn btn-primary">
                  {"Поток " + (index + 1)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
