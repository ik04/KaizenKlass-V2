import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import { Dashboard } from "~/components/dashboard";

export default function assignment() {
  const {
    assignment,
    solutions,
  }: { assignment: Assignment; solutions: Solution[] } = useLoaderData();
  console.log(assignment, solutions.length);
  // todo: refactor back functionality with this section

  return (
    <div className="bg-main h-screen">
      <Dashboard>
        <div className="folder flex flex-col">
          <div className="flex justify-end">
            <div className="subject-file-name border-b-mainLighter h-0 px-4 max-w-[20%] border-r-[25px] border-r-transparent border-l-[25px] border-l-transparent flex justify-start border-b-[50px]">
              <Link
                to={`/subject/${assignment.subject_uuid}`}
                className="text-highlightSecondary translate-y-3 font-base font-semibold"
              >
                {assignment.subject}
              </Link>
            </div>
          </div>
          <div className="bg-mainLighter rounded-s-2xl p-4 flex flex-col space-y-3">
            <div className="Title font-base text-highlight text-4xl ">
              {assignment.title}
            </div>
            <div className="description font-base font-semibold text-highlightSecondary">
              {assignment.description}
            </div>
            <a
              href={`${assignment.content}`}
              target="_blank"
              className="flex justify-start"
            >
              <div className="text-highlight font-base font-bold hover:bg-highlightSecondary transition-all duration-150 hover:text-mainLighter">
                Download Content
              </div>
            </a>
            {solutions.length > 0 && (
              <>
                <div className=""></div>
              </>
            )}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export const loader = async ({ params }: any) => {
  const { uuid } = params;
  try {
    const url = `${process.env.PUBLIC_DOMAIN}/api/v1/get-assignment-solutions/${uuid}`;
    const resp = await axios.get(url);
    console.log(resp.data);
    const data = {
      solutions: resp.data.solutions,
      assignment: resp.data.assignment,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
};
