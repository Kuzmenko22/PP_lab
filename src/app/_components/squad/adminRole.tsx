import Link from "next/link";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import TutorSearch from "~/app/ui/tutorSearch";
import { Students } from "../../_components/squad/students";

export function AdminView({
  task,
  tutor,
  squad,
  query,
}: {
  task: { id: string; name: string } | null;
  tutor: { id: string; firstname: string | null; surname: string | null } | null;
  squad: { id: string } | null;
  query: string;
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
              <td>
                <form action="/api/action/squad/deleteTutor" className="form-control">
                  <input type="hidden" name="squadId" defaultValue={squad?.id} />
                  <button type="submit">
                    <UserMinusIcon className="w-6" />
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <TutorSearch query={query} squadId={squad?.id ?? ""} />
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
