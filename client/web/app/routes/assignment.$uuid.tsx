import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";
import { AddSolutionButton } from "~/components/addSolutionButton";
import { GlobalContext } from "~/context/GlobalContext";
import { EditAssignmentButton } from "~/components/editAssignmentButton";
import { toast } from "~/components/ui/use-toast";
import { EditSolutionButton } from "~/components/editSolutionButton";
import { EditOwnSolutionButton } from "~/components/editOwnSolutionButton";

export default function assignment() {
  const {
    assignment,
    solutions,
    baseUrl,
    uuid,
  }: {
    assignment: Assignment;
    solutions: Solution[];
    baseUrl: string;
    uuid: string;
  } = useLoaderData();
  // console.log(assignment, solutions);
  const { userUuid } = useContext(GlobalContext);

  const [readableDeadline, setReadableDeadline] = useState<string>();
  const [isDanger, setIsDanger] = useState<boolean>(false);
  const [assignmentSolutions, setAssignmentSolutions] =
    useState<Solution[]>(solutions);

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
    } else if (minutesUntilDeadline < 0) {
      setIsDanger(true);
      setReadableDeadline("Passed");
    } else {
      setIsDanger(true);
      setReadableDeadline(
        `${minutesUntilDeadline} minute${minutesUntilDeadline === 1 ? "" : "s"}`
      );
    }
  };

  useEffect(() => {
    if (assignment.deadline) {
      calculateTimeUntilDeadline(assignment.deadline);
    }
  }, [assignment.deadline]);
  const deleteAssignment = async () => {
    try {
      const resp = await axios.delete(
        `${baseUrl}/api/v1/delete-assignment/${uuid}`
      );

      // console.log("deleted assignment!");
      history.back();
    } catch (error) {
      toast({
        title: "Error Deleting Assignment",
        description: `An error occurred while deleting the solution`,
        variant: "destructive",
      });
      console.error(error);
    }
  };
  const { isAuthenticated, role } = useContext(GlobalContext);
  // ? limit to 1 answer per assignment
  // todo: add dates
  // todo: ideate on figma design for divisions

  function parseDateTimeForIndia(dateTimeString: string): string {
    const parsedDate = new Date(dateTimeString);

    if (isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    };

    const formattedDateTime = parsedDate.toLocaleString("en-IN", options);

    return formattedDateTime;
  }

  function convertLinksToAnchors(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, function (url) {
      return `<a href="${url}" style="color: #3A84CE;" target="_blank">${url}</a>`;
    });
  }

  const deleteOwnSolution = async (solutionUuid: string) => {
    try {
      const resp = await axios.delete(
        `${baseUrl}/api/v1/delete-own-solution/${solutionUuid}`
      );
      setAssignmentSolutions((prevSolutions: Solution[]) =>
        prevSolutions.filter(
          (solution) => solution.solution_uuid !== solutionUuid
        )
      );
      toast({
        title: "Solution deleted!",
        description: `the solution has been deleted`,
      });
      console.log("deleted solution!");
    } catch (error) {
      toast({
        title: "Error Request Failed",
        description: "An error occurred while deleting the solution",
        variant: "destructive",
      });
      console.error("Error deleting solution:", error);
    }
    // console.log(solutions);
  };
  const deleteSolution = async (solutionUuid: string) => {
    try {
      const resp = await axios.delete(
        `${baseUrl}/api/v1/delete-solution/${solutionUuid}`
      );
      setAssignmentSolutions((prevSolutions: Solution[]) =>
        prevSolutions.filter(
          (solution) => solution.solution_uuid !== solutionUuid
        )
      );
      toast({
        title: "Solution deleted!",
        description: `the solution has been deleted`,
      });
      console.log("deleted solution!");
    } catch (error) {
      toast({
        title: "Error Request Failed",
        description: "An error occurred while deleting the solution",
        variant: "destructive",
      });
      console.error("Error deleting solution:", error);
    }
    // console.log(solutions);
  };

  // todo: finish solution components
  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="folder flex flex-col">
          <div className="p-1">
            <BackButton />
          </div>
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
          <div className="bg-mainLighter h-min-[50%] rounded-s-2xl p-4 flex flex-col space-y-3">
            <div className="Title font-base flex items-center space-x-3 text-highlight text-4xl ">
              <h1>{assignment.title}</h1>
              {isAuthenticated && role == 2 && (
                <EditAssignmentButton
                  assignmentUuid={uuid}
                  baseUrl={baseUrl}
                  originalDescription={assignment.description}
                  originalLink={assignment.link}
                  originalSubjectUuid={assignment.subject_uuid}
                  originalTitle={assignment.title}
                />
              )}
              {isAuthenticated && role == 2 && (
                <img
                  src="/assets/trash.png"
                  onClick={deleteAssignment}
                  className="w-7 mb-2"
                  alt=""
                />
              )}
            </div>
            {assignment.description && (
              <div className="description font-base font-semibold text-highlight">
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertLinksToAnchors(assignment.description),
                  }}
                />{" "}
              </div>
            )}
            {assignment.link !== null && (
              <a
                href={`${assignment.link}`}
                target="_blank"
                className="flex justify-start"
              >
                <div className="text-highlight font-base hover:p-1 font-bold hover:bg-highlight transition-all duration-150 hover:text-mainLighter">
                  Visit Classroom
                </div>
              </a>
            )}
            {assignment.content !== null && (
              <a
                href={`${assignment.content}`}
                target="_blank"
                className="flex justify-start"
              >
                <div className="text-highlight font-base hover:p-1 font-bold hover:bg-highlight transition-all duration-150 hover:text-mainLighter">
                  Download Content
                </div>
              </a>
            )}
            {assignment.deadline !== null && (
              <div className="flex items-center justify-between">
                <p className="text-highlight font-base font-bold transition-all duration-150 hover:text-red-500">
                  {assignment.deadline &&
                    parseDateTimeForIndia(assignment.deadline)}
                </p>
                <p
                  className={`${
                    !isDanger ? "text-highlight " : "text-gray-500"
                  } font-base font-bold text-3xl`}
                >
                  {readableDeadline}
                </p>
              </div>
            )}
            {assignmentSolutions.length > 0 && (
              <>
                <div className="w-full border border-highlightSecondary border-dashed"></div>
                {assignmentSolutions.map((solution) => (
                  <div className="flex flex-col justify-between items-start">
                    <div className="Title font-base mb-2 flex items-center space-x-3 text-highlightSecondary text-3xl ">
                      <h1> Posted by: {solution.username}</h1>
                      {userUuid != solution.user_uuid ? (
                        <>
                          {isAuthenticated && role == 2 && (
                            // todo: replace edit with solution edits
                            <EditSolutionButton
                              baseUrl={baseUrl}
                              solutionUuid={solution.solution_uuid}
                              originalDescription={solution.description}
                            />
                          )}
                          {isAuthenticated && role == 2 && (
                            <img
                              src="/assets/trash.png"
                              onClick={() =>
                                deleteSolution(solution.solution_uuid)
                              }
                              className="w-7 mb-2"
                              alt=""
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <EditOwnSolutionButton
                            baseUrl={baseUrl}
                            solutionUuid={solution.solution_uuid}
                            originalDescription={solution.description}
                          />
                          <img
                            src="/assets/trash.png"
                            onClick={() =>
                              deleteOwnSolution(solution.solution_uuid)
                            }
                            className="w-7 mb-2"
                            alt=""
                          />
                        </>
                      )}
                    </div>
                    {solution.content && (
                      <a
                        href={`${solution.content}`}
                        className="text-highlightSecondary font-base font-semibold hover:p-1 hover:bg-highlightSecondary transition-all duration-150 hover:text-mainLighter"
                      >
                        Download Answer Content
                      </a>
                    )}
                    {solution.description && (
                      <div className="description font-base font-semibold text-highlight">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: convertLinksToAnchors(solution.description),
                          }}
                        />
                      </div>
                    )}
                    {/* todo:sanitize html */}
                    {/* <div className="w-full border border-highlightSecondary border-dashed"></div> */}
                  </div>
                ))}
              </>
            )}
          </div>
          {isAuthenticated && (
            <div className="mt-10">
              <AddSolutionButton assignmentUuid={uuid} baseUrl={baseUrl} />
            </div>
          )}
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
    // console.log(resp.data);
    const data = {
      solutions: resp.data.solutions,
      assignment: resp.data.assignment,
      baseUrl: process.env.PUBLIC_DOMAIN,
      uuid: uuid,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
};
