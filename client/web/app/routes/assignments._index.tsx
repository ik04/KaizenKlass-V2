import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddAssignmentButton } from "~/components/addAssignmentButton";
import { AssignmentCard } from "~/components/assignmentCard";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";
import { EmptyState } from "~/components/emptyState";
import { GlobalContext } from "~/context/GlobalContext";
import Calendar from "react-calendar";
import { Skeleton } from "~/components/ui/skeleton";
import { toast } from "~/components/ui/use-toast";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Assignments | KaizenKlass" },
    { property: "og:title", content: "Assignments | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export default function assignments() {
  // const { assignments }: { assignments: Assignment[] } = useLoaderData();
  // ? directly set nextpage url?
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  const { isAuthenticated, role, hasEditPrivileges } =
    useContext(GlobalContext);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [isLastPage, setIsLastPage] = useState(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAssignmentAddition = (assignment: Assignment) => {
    setAssignments([assignment, ...assignments]);
  };
  const callAssignmentsWithSubjects = async () => {
    try {
      const url = `${baseUrl}/api/v1/get-assignment-subjects?page=1`;
      const resp = await axios.get(url);
      // console.log(resp);
      setIsLoading(false);
      setLastPage(resp.data.assignments.last_page);
      if (resp.data.assignments.data.length === 0) {
        setIsEmpty(true);
      } else {
        setAssignments(resp.data.assignments.data);
      }
      if (resp.data.assignments.next_page_url !== null) {
        setIsLastPage(false);
      }
    } catch (error) {
      toast({
        title: "Error Loading Assignments",
        description: `An error occurred while loading the assignments`,
        variant: "destructive",
      });
    }
  };
  const callNextPage = async () => {
    try {
      const nextPage = page + 1;
      const url = `${baseUrl}/api/v1/get-assignment-subjects?page=${nextPage}`;
      const resp = await axios.get(url);
      const newAssignments = resp.data.assignments.data;
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        ...newAssignments,
      ]);
      setPage(nextPage);
      if (resp.data.assignments.next_page_url === null) {
        setIsLastPage(true);
      }
    } catch (error) {
      toast({
        title: "Error Loading Assignments",
        description: `An error occurred while loading the assignments`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    callAssignmentsWithSubjects();
  }, []);

  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="header w-full h-20 mb-10 flex justify-between items-center text-5xl">
          {/* <BackButton /> */}
          <div className="font-display text-highlightSecondary mb-7 text-5xl">
            Assignments
          </div>
        </div>
        {!isLoading ? (
          <>
            <div className="justify-center items-center my-4">
              {hasEditPrivileges && (
                <AddAssignmentButton
                  handleAddAssignment={handleAssignmentAddition}
                  baseUrl={baseUrl}
                />
              )}
            </div>
            {!isEmpty ? (
              <>
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
                        className="uppercase hover:text-dashboard hover:bg-highlightSecondary duration-150 font-base text-highlightSecondary border-highlightSecondary border-2 w-[40%] flex justify-center items-center text-2xl p-2"
                        onClick={callNextPage}
                      >
                        load more
                      </div>
                    </div>
                  )}
                </>
              </>
            ) : (
              <EmptyState />
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-7">
              <Skeleton className="h-32 px-5 rounded-2xl bg-mainLighter" />
              <Skeleton className="h-32 px-5 rounded-2xl bg-mainLighter" />
              <Skeleton className="h-32 px-5 rounded-2xl bg-mainLighter" />
              <Skeleton className="h-32 px-5 rounded-2xl bg-mainLighter" />
            </div>
          </>
        )}
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
