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
  const { userUuid, hasEditPrivileges, isAuthenticated, role } =
    useContext(GlobalContext);

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
    } catch (error) {
      toast({
        title: "Error Request Failed",
        description: "An error occurred while deleting the solution",
        variant: "destructive",
      });
      console.error("Error deleting solution:", error);
    }
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
  };
  console.log(solutions);

  // todo: finish solution components
  // todo: redo assignments page with new design
  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="flex flex-col space-y-4">
          <BackButton />
          <div className="md:flex md:space-x-4 md:items-start">
            <div className="icon md:flex w-16 hidden justify-center p-2 items-center bg-dashboard rounded-full">
              <img
                src="/assets/assignment.svg"
                className="md:w-16"
                alt="lightbulb"
              />
            </div>
            <div className="assignment flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <h1 className="text-highlight font-base text-3xl">
                  {assignment.title}
                </h1>
                <div className="flex space-x-2">
                  {hasEditPrivileges && (
                    <EditAssignmentButton
                      assignmentUuid={uuid}
                      baseUrl={baseUrl}
                      originalLink={assignment.link}
                      originalTitle={assignment.title}
                      originalSubjectUuid={assignment.subject_uuid}
                      originalDescription={assignment.description}
                    />
                  )}

                  {hasEditPrivileges && (
                    <img
                      src="/assets/trash.png"
                      onClick={deleteAssignment}
                      className="w-7"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <a
                href={`/subject/${assignment.subject_uuid}`}
                className="text-highlightSecondary text-start text-xl font-base"
              >
                {assignment.subject}
              </a>
              {assignment.description && (
                <div
                  className="text-highlight text-sm font-base"
                  dangerouslySetInnerHTML={{
                    __html: convertLinksToAnchors(assignment.description),
                  }}
                />
              )}
              <div className="flex space-x-2 items-center">
                {assignment.content && (
                  <a
                    href={`${assignment.content}`}
                    className="flex items-center space-x-2"
                  >
                    <img src="/assets/download.svg" alt="" />
                    <p className="text-highlight font-base text-xs">
                      Download Content
                    </p>
                  </a>
                )}
                {assignment.link && (
                  <a
                    href={`${assignment.link}`}
                    className="flex items-center space-x-2"
                  >
                    <img src="/assets/link.svg" alt="" />
                    <p className="text-highlight font-base text-xs">
                      Visit Classroom
                    </p>
                  </a>
                )}
              </div>
            </div>
          </div>
          <p className="md:hidden text-highlightSecondary font-base">
            Solutions:
          </p>
          <div className="solutions">
            {solutions.map((solution) => (
              <div className="md:flex md:space-x-4 md:items-start">
                <div className="icon md:flex w-16 hidden justify-center p-2 items-center bg-dashboard rounded-full">
                  <img
                    src="/assets/lightBulb.svg"
                    className="md:w-16"
                    alt="lightbulb"
                  />
                </div>
                <div className="solution">
                  <h1 className="text-highlightSecondary font-base text-xl">
                    Posted by: {solution.username}
                  </h1>
                  <div
                    className="text-highlight text-sm font-base"
                    dangerouslySetInnerHTML={{
                      __html: convertLinksToAnchors(solution.description),
                    }}
                  />
                </div>
              </div>
            ))}
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
