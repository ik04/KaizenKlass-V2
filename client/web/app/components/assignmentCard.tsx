import { Link } from "@remix-run/react";
import React from "react";

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
  const isMobileViewport = window.innerWidth < 768;
  const truncatedTitle = title.length > 10 ? title.slice(0, 10) + "..." : title;

  return (
    <Link
      to={`/assignments/${assignment_uuid}`}
      className="bg-mainLighter h-max-36 md:h-32 flex rounded-2xl flex-col items-start justify-center hover:border-highlight border border-mainLighter duration-200 transition-all space-y-3 p-5"
    >
      <Link
        to={`/assignments/${assignment_uuid}`}
        className="flex justify-between w-full items-center"
      >
        <h2 className="text-4xl font-base text-highlight">
          {!isMobileViewport ? title : truncatedTitle}
        </h2>
        <img src="/assets/assignment.svg" className="w-12" alt="" />
      </Link>
      {subject && subject_uuid && (
        <Link
          to={`/subjects/${subject_uuid}`}
          className="text-highlightSecondary font-base"
        >
          <div className="flex space-x-1">
            <p>{subject}</p>
            <img src="/assets/book.svg" alt="" />
          </div>
        </Link>
      )}
    </Link>
  );
};
