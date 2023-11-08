import Subject from "../../../components/pages/Subject";
import React from "react";

const page = ({
  params: { subjectUuid },
}: {
  params: { subjectUuid: string };
}) => {
  console.log(subjectUuid);
  return (
    <div>
      <Subject subjectUuid={subjectUuid} />
    </div>
  );
};

export default page;
