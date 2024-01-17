import { Link } from "@remix-run/react";
export const SubjectAssignmentCard = ({
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
      className="bg-mainLighter h-32 flex rounded-2xl flex-col items-start justify-center hover:border-highlight border border-mainLighter duration-200 transition-all space-y-3 px-5"
    >
      <Link
        to={`/assignments/${assignment_uuid}`}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center space-x-2">
          <h2 className="text-4xl font-base text-highlight">
            {!isMobileViewport ? title : truncatedTitle}
          </h2>
        </div>
        <img src="/assets/assignment.svg" className="w-12" alt="" />
      </Link>
    </Link>
  );
};
