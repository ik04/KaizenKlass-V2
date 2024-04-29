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
import { MetaFunction, redirect } from "@remix-run/node";

export default function assignments() {
  const {
    storedAssignment,
    solutions,
    baseUrl,
    uuid,
    currentDomain,
  }: {
    storedAssignment: Assignment;
    solutions: Solution[];
    baseUrl: string;
    uuid: string;
    currentDomain: string;
  } = useLoaderData();
  const { userUuid, hasEditPrivileges, isAuthenticated, role } =
    useContext(GlobalContext);

  const handleAddSolution = (solution: Solution) => {
    setAssignmentSolutions((prevSolutions) => [solution, ...prevSolutions]);
  };
  const handleEditAssignment = (assignment: Assignment) => {
    setAssignment(assignment);
  };

  const handleEditSolution = (updatedSolution: Solution) => {
    setAssignmentSolutions((prevSolutions: Solution[]) =>
      prevSolutions.map((solution) =>
        solution.solution_uuid === updatedSolution.solution_uuid
          ? updatedSolution
          : solution
      )
    );
  };

  const [readableDeadline, setReadableDeadline] = useState<string>();
  const [isDanger, setIsDanger] = useState<boolean>(false);
  const [assignment, setAssignment] = useState<Assignment>(storedAssignment);
  const [assignmentSolutions, setAssignmentSolutions] =
    useState<Solution[]>(solutions);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const calculateTimeUntilDeadline = (deadline: string) => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const timeDifference = deadlineDate.getTime() - now.getTime();
      if (timeDifference <= 0) {
        setIsDanger(true);
        setReadableDeadline("Passed");
        clearInterval(interval); // Stop the interval if deadline has passed
      } else {
        const daysUntilDeadline = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        const hoursUntilDeadline = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesUntilDeadline = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsUntilDeadline = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        if (daysUntilDeadline > 0) {
          setIsDanger(false);
          setReadableDeadline(
            `${daysUntilDeadline} day${
              daysUntilDeadline === 1 ? "" : "s"
            } ${hoursUntilDeadline} hour${
              hoursUntilDeadline === 1 ? "" : "s"
            } ${minutesUntilDeadline} min${
              minutesUntilDeadline === 1 ? "" : "s"
            } `
          );
        } else {
          setIsDanger(true);
          setReadableDeadline(
            `${hoursUntilDeadline} Hour${
              hoursUntilDeadline === 1 ? "" : "s"
            } ${minutesUntilDeadline} Min${
              minutesUntilDeadline === 1 ? "" : "s"
            } ${secondsUntilDeadline} Sec${
              secondsUntilDeadline === 1 ? "" : "s"
            }`
          );
        }
      }
    };

    if (assignment.deadline) {
      const deadlineString = assignment.deadline;
      calculateTimeUntilDeadline(deadlineString);
      if (new Date(deadlineString) > new Date()) {
        interval = setInterval(() => {
          calculateTimeUntilDeadline(deadlineString);
        }, 1000);
        return () => clearInterval(interval);
      }
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

  function convertLinksToAnchors(text: string, currentDomain: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, function (url) {
      if (url === currentDomain || url.startsWith(currentDomain + "/")) {
        return ` <a href="${url}" style="color: #D5CEA3; cursor: pointer; font-weight: bold;">Visit Source -></a>`;
      } else {
        return `<a href="${url}" style="color: #3A84CE; cursor: pointer;" target="_blank">${url}</a>`;
      }
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

  const convertToViewLink = (link: string) => {
    // Extracting the file ID from the download link
    const startIndex = link.indexOf("id=") + 3;
    const endIndex = link.length;
    const fileId = link.substring(startIndex, endIndex);
    // Constructing the view link
    const viewLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    return viewLink;
  };
  // todo: finish solution components
  // todo: redo assignments page with new design
  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="flex flex-col space-y-4 pb-5">
          {<BackButton />}
          <div className="md:flex md:justify-center md:items-center md:w-full">
            <div className="md:flex md:flex-col md:space-y-9 md:w-4/5">
              <div className="md:flex md:space-x-4 md:items-start">
                <div className="icon md:flex w-16 hidden justify-center p-2 items-center bg-mainLighter rounded-full">
                  <img
                    src="/assets/assignment.svg"
                    className="md:w-16"
                    alt="assignment"
                  />
                </div>
                <div className="assignment flex flex-col md:w-full space-y-1 md:space-y-0">
                  <div className="flex items-center justify-between">
                    <h1 className="text-highlight font-base text-2xl md:text-4xl">
                      {assignment.title}
                    </h1>
                    <div className="flex space-x-2">
                      {hasEditPrivileges && (
                        <EditAssignmentButton
                          handleEditAssignment={handleEditAssignment}
                          assignmentUuid={uuid}
                          baseUrl={baseUrl}
                          originalLink={assignment.link}
                          originalTitle={assignment.title}
                          originalSubjectUuid={assignment.subject_uuid}
                          originalDescription={assignment.description}
                          originalDeadline={assignment.deadline}
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
                    href={`/subjects/${assignment.subject_uuid}`}
                    className="text-highlightSecondary text-start text-sm md:text-2xl font-base"
                  >
                    {assignment.subject}
                  </a>
                  {assignment.description && (
                    <div
                      className="text-highlight text-sm md:text-xl font-base whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: convertLinksToAnchors(
                          assignment.description,
                          currentDomain
                        ),
                      }}
                    />
                  )}
                  {assignment.deadline !== null && (
                    <div className="flex items-center justify-between">
                      <p className="text-highlightSecondary text-xs cursor-default font-base md:text-base transition-all duration-150 hover:text-red-500">
                        {assignment.deadline &&
                          parseDateTimeForIndia(assignment.deadline)}
                      </p>
                      <p
                        className={`${
                          !isDanger
                            ? "text-highlightSecondary font-light"
                            : "text-red-500 font-semibold"
                        } font-base font-bold md:text-3xl text-xs md:p-0`}
                      >
                        {readableDeadline}
                      </p>
                    </div>
                  )}{" "}
                  <div className="flex space-x-2 md:space-x-5 items-center md:-ml-2 md:mt-6">
                    {assignment.content && (
                      <>
                        <a
                          href={`${assignment.content}`}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src="/assets/download.svg"
                            className="md:w-10"
                            alt=""
                          />
                          <p className="text-highlight font-base font-bold text-xs md:text-lg">
                            Download Content
                          </p>
                        </a>
                      </>
                    )}
                    {assignment.content && (
                      <a
                        target="_blank"
                        href={`${convertToViewLink(assignment.content)}`}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src="/assets/link.svg"
                          className="md:w-10"
                          alt=""
                        />
                        <p className="text-highlight font-base font-bold text-xs md:text-lg">
                          View content
                        </p>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <p className="md:hidden text-highlightSecondary font-base my-5">
                Solutions:
              </p>
              <div className="solutions flex flex-col space-y-5 md:space-y-7">
                {assignmentSolutions.map((solution) => (
                  <div className="md:flex md:space-x-4 md:items-start">
                    <div className="icon md:flex w-16 hidden justify-center p-3 items-center bg-mainLighter rounded-full">
                      <img
                        src="/assets/lightBulb.svg"
                        className="md:w-16"
                        alt="lightbulb"
                      />
                    </div>
                    <div className="solution flex flex-col space-y-1 md:space-x-0 md:w-full w-[300px] break-words overflow-hidden whitespace-wrap overflow-ellipsis md:whitespace-normal md:overflow-visible md:text-overflow-clip">
                      <div className="flex justify-between">
                        <h1 className="text-highlightSecondary font-base text-xl md:text-2xl">
                          Posted by: {solution.username}
                        </h1>
                        <div className="flex space-x-3 items-start">
                          {isAuthenticated &&
                            userUuid == solution.user_uuid && (
                              <EditOwnSolutionButton
                                handleEditSolution={handleEditSolution}
                                baseUrl={baseUrl}
                                originalDescription={solution.description}
                                solutionUuid={solution.solution_uuid}
                              />
                            )}
                          {isAuthenticated &&
                            userUuid == solution.user_uuid && (
                              <img
                                src="/assets/trash.png"
                                onClick={() =>
                                  deleteOwnSolution(solution.solution_uuid)
                                }
                                className="w-5 md:w-7"
                                alt=""
                              />
                            )}
                        </div>
                      </div>
                      <div
                        className="text-highlight text-sm md:text-lg font-base whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: convertLinksToAnchors(
                            solution.description,
                            currentDomain
                          ),
                        }}
                      />
                      <div className="flex items-center space-x-2">
                        {solution.content && (
                          <a
                            href={`${solution.content}`}
                            className="flex items-center space-x-2"
                          >
                            <img
                              src="/assets/download.svg"
                              className="md:w-10"
                              alt=""
                            />
                            <p className="text-highlight font-base text-xs md:text-lg font-bold">
                              Download Content
                            </p>
                          </a>
                        )}
                        {solution.content && (
                          <a
                            target="_blank"
                            href={`${convertToViewLink(solution.content)}`}
                            className="flex items-center space-x-2"
                          >
                            <img
                              src="/assets/link.svg"
                              className="md:w-10"
                              alt=""
                            />
                            <p className="text-highlight font-base text-xs md:text-lg font-bold">
                              View Content
                            </p>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isAuthenticated && (
                <div className="my-10">
                  <AddSolutionButton
                    assignmentUuid={uuid}
                    handleSolutionAddition={handleAddSolution}
                    baseUrl={baseUrl}
                  />
                </div>
              )}
            </div>
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
    const data = {
      solutions: resp.data.solutions,
      storedAssignment: resp.data.assignment,
      baseUrl: process.env.PUBLIC_DOMAIN,
      currentDomain: process.env.CURRENT_DOMAIN,
      uuid: uuid,
    };
    return data;
  } catch (error) {
    console.log(error);
    // return redirect("/not-found")
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }: { data: any }) => {
  const { storedAssignment } = data;
  return [
    { title: `${storedAssignment.title} | ${storedAssignment.subject}` },
    {
      property: "og:title",
      content: `${storedAssignment.title} | ${storedAssignment.subject}`,
    },
    {
      name: "description",
      content: `${storedAssignment.description}`,
    },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
  ];
};
