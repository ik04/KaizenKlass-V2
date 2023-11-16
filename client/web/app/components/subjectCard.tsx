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
      className="hover:border-highlight p-3 border w-80 h-80 rounded-3xl flex flex-col justify-center items-center space-y-5 bg-primaryLighter border-primaryLighter transition-all"
    >
      <img src="/assets/folder.svg" className="w-24" alt="folder" />
      <div className="font-base text-highlightSecondary text-center text-3xl">
        {subject}
      </div>
    </Link>
  );
};
