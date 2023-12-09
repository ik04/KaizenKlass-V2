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
      to={`/subject/${uuid}`}
      className="hover:border-highlight p-2 border border-mainLighter w-80 h-80 rounded-3xl flex flex-col justify-center items-center space-y-5 bg-mainLighter transition-all"
    >
      <img src="/assets/book.svg" className="w-24" alt="folder" />
      <div className="font-base text-highlightSecondary font-semibold text-center text-2xl">
        {subject}
      </div>
    </Link>
  );
};
