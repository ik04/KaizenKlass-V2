import { Link } from "@remix-run/react";
import React from "react";
// ! switch back to camelcase
export const AssignmentCard = ({
  title,
  assignment_uuid,
  subject,
  subject_uuid,
}: {
  title: string;
  assignment_uuid: string;
  subject?: string;
  subject_uuid?: string;
}) => {
  return (
    <Link
      to={`/assignment/${assignment_uuid}`}
      className="bg-primaryLighter h-32 flex rounded-2xl flex-col items-start justify-center hover:border-highlight border border-primaryLighter duration-200 transition-all space-y-3 px-5"
    >
      <Link to={`/assignment/${assignment_uuid}`} className="">
        <h2 className="text-4xl font-base text-highlight">{title}</h2>
      </Link>
      {subject && subject_uuid && (
        <Link
          to={`/subject/${subject_uuid}`}
          className="text-highlightSecondary font-base"
        >
          {subject}
        </Link>
      )}
    </Link>
  );
};
