import { MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddSubjectAssignmentButton } from "~/components/addSubjectAssignmentButton";
import { AssignmentCard } from "~/components/assignmentCard";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";
import { EmptyState } from "~/components/emptyState";
import { SubjectAssignmentCard } from "~/components/subjectAssignmentCard";
import { Skeleton } from "~/components/ui/skeleton";
import { GlobalContext } from "~/context/GlobalContext";

function sanitizeAndCapitalizeSlug(slug: string) {
  // Convert to lowercase
  let sanitizedSlug = slug.toLowerCase();

  // Replace dashes with spaces
  sanitizedSlug = sanitizedSlug.replace(/-/g, " ");

  // Remove special characters
  sanitizedSlug = sanitizedSlug.replace(/[^\w\s]/g, "");

  // Capitalize each letter
  sanitizedSlug = sanitizedSlug.replace(/\b\w/g, (letter) =>
    letter.toUpperCase()
  );

  return sanitizedSlug;
}

export default function subject() {
  const {
    baseUrl,
    uuid,
  }: {
    assignments: Assignment[];
    subject: string;
    baseUrl: string;
    uuid: string;
  } = useLoaderData();
  const { isAuthenticated, role, hasEditPrivileges } =
    useContext(GlobalContext);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleAssignmentAddition = (assignment: Assignment) => {
    setAssignments([assignment, ...assignments]);
  };
  useEffect(() => {
    const callSubjectAssignments = async () => {
      try {
        const url = `${baseUrl}/api/v1/get-subject-assignments/${uuid}`;
        const resp = await axios.get(url);
        console.log(resp);
        console.log("himom");
        const data = {
          subject: resp.data.subject,
          assignments: resp.data.assignments,
        };
        setSubject(data.subject);
        setAssignments(data.assignments);
        console.log(hasEditPrivileges);
        if (data.assignments.length === 0) {
          setIsEmpty(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    callSubjectAssignments();
  }, [uuid, baseUrl]);

  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        {!isLoading ? (
          <>
            <div className="header w-full md:space-x-0 space-x-20 md:h-20 mb-10 md:justify-between flex items-center">
              <BackButton />
              <div className="font-display text-xl md:text-5xl text-highlightSecondary">
                {subject}
              </div>
            </div>
            {isAuthenticated && hasEditPrivileges && (
              <div className="mb-7">
                <AddSubjectAssignmentButton
                  handleAddAssignment={handleAssignmentAddition}
                  baseUrl={baseUrl}
                  subjectUuid={uuid}
                />
              </div>
            )}
            {!isEmpty ? (
              <div className="flex-col space-y-7 flex mb-20">
                {assignments &&
                  assignments.map((assignment) => (
                    <SubjectAssignmentCard
                      key={assignment.subject_uuid}
                      subject={assignment.subject}
                      title={assignment.title}
                      assignment_uuid={assignment.assignment_uuid}
                      subject_uuid={assignment.subject_uuid}
                    />
                  ))}
              </div>
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
              <Skeleton className="h-32 px-5 rounded-2xl bg-mainLighter" />
            </div>
          </>
        )}
      </Dashboard>
    </div>
  );
}

export const loader = async ({ params }: any) => {
  const { uuid } = params;
  const data = {
    baseUrl: process.env.PUBLIC_DOMAIN,
    uuid: uuid,
  };
  return data;
};

export const meta: MetaFunction<typeof loader> = ({ data }: { data: any }) => {
  const { uuid } = data;
  return [
    { title: `${sanitizeAndCapitalizeSlug(uuid)}` },
    {
      property: "og:title",
      content: `${sanitizeAndCapitalizeSlug(uuid)}`,
    },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
  ];
};
