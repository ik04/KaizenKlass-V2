import Link from "next/link";
import React from "react";

interface subjectCardProps {
  subject: string;
  subjectUuid: string;
  key: any;
}

export const SubjectCard = ({
  subject,
  subjectUuid,
  key,
}: subjectCardProps) => {
  return (
    <Link
      href={`/subject/${subjectUuid}`}
      key={key}
      className="cursor-pointer w-[300px] hover:-translate-y-1 p-2 h-[400px] rounded-lg hover:border-none bg-primary-complement text-custom-blue  hover:text-white hover:bg-gradient-to-tl hover:from-primary hover:to-primary-complement ease-in duration-200 flex justify-center items-center"
    >
      <h1 className="font-base text-center text-clip font-light text-[40px]">
        {subject}
      </h1>
    </Link>
  );
};
