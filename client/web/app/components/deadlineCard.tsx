import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export const DeadlineCard = ({
  title,
  assignment_uuid,
  deadline,
}: {
  title: string;
  assignment_uuid: string;
  deadline: string;
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
      setReadableDeadline(
        `${daysUntilDeadline} day${daysUntilDeadline === 1 ? "" : "s"}`
      );
    } else if (hoursUntilDeadline > 0) {
      setIsDanger(true);
      setReadableDeadline(
        `${hoursUntilDeadline} hour${hoursUntilDeadline === 1 ? "" : "s"}`
      );
    } else {
      setIsDanger(true);
      setReadableDeadline(
        `${minutesUntilDeadline} minute${minutesUntilDeadline === 1 ? "" : "s"}`
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
      className="bg-mainLighter h-32 flex rounded-2xl flex-col items-start justify-center hover:border-highlight border border-mainLighter duration-150 transition-all space-y-3 px-5"
    >
      <Link to={`/assignments/${assignment_uuid}`} className="">
        <h2 className="text-4xl font-base text-highlight">
          {!isMobileViewport ? title : truncatedTitle}
        </h2>
      </Link>
      <div
        className={`${
          !isDanger ? "text-highlightSecondary" : "text-[#B13232]"
        } font-base text-2xl`}
      >
        {readableDeadline}
      </div>
    </Link>
  );
};
