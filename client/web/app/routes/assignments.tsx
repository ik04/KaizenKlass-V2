import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddAssignmentButton } from "~/components/addAssignmentButton";
import { AssignmentCard } from "~/components/assignmentCard";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";
import { EmptyState } from "~/components/emptyState";
import { GlobalContext } from "~/context/GlobalContext";

export default function assignments() {
  // const { assignments }: { assignments: Assignment[] } = useLoaderData();
  // ? directly set nextpage url?
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  const { isAuthenticated, role } = useContext(GlobalContext);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [isLastPage, setIsLastPage] = useState(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const callAssignmentsWithSubjects = async () => {
    const url = `${baseUrl}/api/v1/get-assignment-subjects?page=1`;
    const resp = await axios.get(url);
    console.log(resp.data.assignments.data);
    setLastPage(resp.data.assignments.last_page);
    setAssignments(resp.data.assignments.data);
  };
  const callNextPage = async () => {
    const nextPage = page + 1;
    const url = `${baseUrl}/api/v1/get-assignment-subjects?page=${nextPage}`;
    const resp = await axios.get(url);
    const newAssignments = resp.data.assignments.data;
    setAssignments((prevAssignments) => [
      ...prevAssignments,
      ...newAssignments,
    ]);
    console.log(nextPage);
    setPage(nextPage);
    if (resp.data.assignments.next_page_url == null) {
      setIsLastPage(true);
    }
  };
  useEffect(() => {
    callAssignmentsWithSubjects();
    if (assignments.length === 0) {
      setIsEmpty(true);
    }
    console.log(isEmpty);
  }, []);
  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="header w-full h-20 mb-10 flex justify-between items-center text-5xl">
          <BackButton />
          <div className="font-display text-highlightSecondary mb-7 text-5xl">
            Assignments
          </div>
        </div>
        <div className="justify-center items-center my-4">
          {isAuthenticated && role === 2 && (
            <AddAssignmentButton baseUrl={baseUrl} />
          )}
        </div>
        <>
          <div className="flex flex-col space-y-7 mb-10">
            {assignments &&
              assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.assignment_uuid}
                  subject={assignment.subject}
                  title={assignment.title}
                  assignment_uuid={assignment.assignment_uuid}
                  subject_uuid={assignment.subject_uuid}
                />
              ))}
          </div>

          {!isLastPage && (
            <div className="load-more flex mb-20 justify-center items-center cursor-pointer">
              <div
                className="uppercase font-base text-highlightSecondary border-highlightSecondary border-2 w-[40%] flex justify-center items-center text-2xl p-2"
                onClick={callNextPage}
              >
                load more
              </div>
            </div>
          )}
        </>
      </Dashboard>
    </div>
  );
}

// ! server call not working
// export const loader = async () => {
//   const url = `${process.env.PUBLIC_DOMAIN}/api/v1/get-assignment-subjects?page=1`;
//   const resp = await axios.get(url);
//   console.log(resp.data.assignments.data);
//   return resp.data.assignments.data;
// };
export const loader = async () => {
  const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
  return { baseUrl };
};
