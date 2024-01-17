import { Link } from "@remix-run/react";

export const SubjectCard = ({
  subject,
  uuid,
}: {
  subject: string;
  uuid: string;
}) => {
  // todo: make uniquee with varying icons, eeg: initials or something else
  return (
    <Link
      to={`/subjects/${uuid}`}
      className="hover:border-highlight p-5 flex justify-between items-center md:p-2 border border-mainLighter md:w-80 md:h-80 rounded-3xl md:flex md:flex-col md:justify-center md:items-center md:space-y-5 bg-mainLighter transition-all"
    >
      <img src="/assets/book.svg" className="md:w-24 w-14" alt="folder" />
      <div className="font-base w-full text-highlightSecondary md:p-0 p-4 font-semibold text-center md:text-2xl">
        {subject}
      </div>
    </Link>
  );
};
