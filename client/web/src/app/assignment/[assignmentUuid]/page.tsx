import Assignment from "../../../components/pages/Assignment";
import React from "react";

const page = ({
  params: { assignmentUuid },
}: {
  params: { assignmentUuid: string };
}) => {
  // optimize load times in the future and use the app router better
  const getAssignmentDetails = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subject-assignments/${assignmentUuid}`;
  };
  return (
    <div>
      <Assignment assignmentUuid={assignmentUuid} />
    </div>
  );
};

export default page;
