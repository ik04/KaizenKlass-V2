import { useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AssignmentCard } from "~/components/assignmentCard";
import { Dashboard } from "~/components/dashboard";

export default function subject() {
  const { assignments }: { assignments: Assignment[] } = useLoaderData();
  console.log(assignments);
  return (
    <div className="bg-primary h-screen">
      <Dashboard>
        {assignments.map((assignment) => (
          <AssignmentCard
            subject={assignment.subject}
            title={assignment.title}
            assignment_uuid={assignment.assignment_uuid}
            subject_uuid={assignment.subject_uuid}
          />
        ))}
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
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};
