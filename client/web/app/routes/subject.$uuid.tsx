import { useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddSubjectAssignmentButton } from "~/components/addSubjectAssignmentButton";
import { AssignmentCard } from "~/components/assignmentCard";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";
import { EmptyState } from "~/components/emptyState";
import { GlobalContext } from "~/context/GlobalContext";

export default function subject() {
  const {
    assignments,
    subject,
    baseUrl,
    uuid,
  }: {
    assignments: Assignment[];
    subject: string;
    baseUrl: string;
    uuid: string;
  } = useLoaderData();
  console.log(assignments);
  const { isAuthenticated, role } = useContext(GlobalContext);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (assignments.length === 0) {
      setIsEmpty(true);
    }
  }, []);

  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="header w-full h-20 mb-10 flex justify-between items-center text-5xl">
          <BackButton />
          <div className="font-display text-highlightSecondary">{subject}</div>
        </div>
        {isAuthenticated && role === 2 && (
          <div className="mb-7">
            <AddSubjectAssignmentButton baseUrl={baseUrl} subjectUuid={uuid} />
          </div>
        )}
        {!isEmpty ? (
          <div className="flex-col space-y-7 flex mb-20">
            {assignments.map((assignment) => (
              <AssignmentCard
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
      </Dashboard>
    </div>
  );
}

export const loader = async ({ params }: any) => {
  const { uuid } = params;
  try {
    const url = `${process.env.PUBLIC_DOMAIN}/api/v1/get-subject-assignments/${uuid}`;
    const resp = await axios.get(url);
    console.log(resp.data);
    const data = {
      subject: resp.data.subject,
      assignments: resp.data.assignments,
      baseUrl: process.env.PUBLIC_DOMAIN,
      uuid: uuid,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
};
