import { Link } from "@remix-run/react";
import React from "react";

export const AssignmentCard = ({
  title,
  assignment_uuid,
  subject,
}: {
  title: string;
  assignment_uuid: string;
  subject: string;
}) => {
  return (
    <div className="bg-primaryLighter h-32 flex justify-between space-y-3 px-5">
      <div className="content">
        <Link to={`/assignment/${assignment_uuid}`} className="">
          <h2 className="text-4xl font-base text-highlight">{title}</h2>
        </Link>
        <p className="text-highlightSecondary font-base">{subject}</p>
      </div>
    </div>
  );
};
