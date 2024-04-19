import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export const DeadlineCard = ({
  title,
  assignment_uuid,
  deadline,
  subject,
  subject_uuid,
}: {
  title: string;
  assignment_uuid: string;
  deadline: string;
  subject: string;
  subject_uuid: string;
}) => {
  const [readableDeadline, setReadableDeadline] = useState<string>();
  const [isDanger, setIsDanger] = useState<boolean>(false);

  const calculateTimeUntilDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate.getTime() - now.getTime();

    const daysUntilDeadline = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    const hoursUntilDeadline = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesUntilDeadline = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (daysUntilDeadline > 0) {
      setIsDanger(false);
      setReadableDeadline(
        `${daysUntilDeadline} day${
          daysUntilDeadline === 1 ? "" : "s"
        } ${hoursUntilDeadline} hour${hoursUntilDeadline === 1 ? "" : "s"}`
      );
    } else {
      setIsDanger(true);
      setReadableDeadline(
        `${hoursUntilDeadline} hour${
          hoursUntilDeadline === 1 ? "" : "s"
        } ${minutesUntilDeadline} min${minutesUntilDeadline === 1 ? "" : "s"}`
      );
    }
  };

  useEffect(() => {
    calculateTimeUntilDeadline(deadline);
  }, [deadline]);

  const isMobileViewport =
    typeof window !== "undefined" && window.innerWidth < 768;
  const truncatedTitle = title.length > 10 ? title.slice(0, 10) + "..." : title;

  return (
    <Link
      to={`/assignments/${assignment_uuid}`}
      className="bg-mainLighter h-32 flex rounded-2xl flex-col items-start justify-center hover:border-highlight border border-mainLighter duration-150 transition-all space-y-1 p-5"
    >
      <Link to={`/assignments/${assignment_uuid}`} className="">
        <h2 className="text-4xl font-base text-highlight">
          {!isMobileViewport ? title : truncatedTitle}
        </h2>
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
      <div
        className={`${
          !isDanger ? "text-highlightSecondary" : "text-[#B13232]"
        } font-base md:text-xl`}
      >
        {readableDeadline}
      </div>
    </Link>
  );
};
