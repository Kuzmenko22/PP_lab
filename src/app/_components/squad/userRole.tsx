import Link from "next/link";
import { Students } from "../../_components/squad/students";

export function UserView({
  task,
  tutor,
  squad,
}: {
  task: { id: string; name: string } | null;
  tutor: { id: string; firstname: string | null; surname: string | null } | null;
  squad: { id: string } | null;
}) {
  return (
    <main>
      <Link href={`/task/${task?.id}`} className="btn btn-primary">
        {task?.name}
      </Link>
      <div>
        <table className="m-4 box-border">
          <tbody>
            <tr>
              <td>Преподаватель:</td>
              <td>
                {tutor ? tutor.firstname + " " + tutor.surname : "Не назначен"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Students
        squadId={squad?.id ?? ""}
        taskId={task?.id ?? ""}
        mode={true}
        squadTutorId={tutor?.id ?? ""}
      />
    </main>
  );
}