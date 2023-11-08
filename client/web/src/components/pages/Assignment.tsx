"use client";
import React, { useEffect, useState, useContext } from "react";
import PublicLayout from "../PublicLayout";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PacmanLoader } from "react-spinners";
import { GlobalContext } from "@/app/context/GlobalContext";
import toast from "react-hot-toast";

interface Solution {
  description: string;
  content: string;
  username: string;
  user_uuid: string;
  solution_uuid: string;
}

const Assignment = ({ assignmentUuid }: { assignmentUuid: string }) => {
  // optimize load times in the future and use the app router better
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  const { updateCurrentPage, userUuid, isAuthenticated, role } =
    useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }

  const getAssignmentDetails = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-assignment-solutions/${assignmentUuid}`;
    const resp = await axios.get(url);
    console.log(resp.data.assignment);
    setTitle(resp.data.assignment.title);
    setDescription(resp.data.assignment.description);
    setLink(resp.data.assignment.link);
    setContent(resp.data.assignment.content);
    setSolutions(resp.data.solutions);
    setLoading(false);
  };

  const handleBase64Response = async (content: string) => {
    try {
      // Decode the base64 content
      // const decodedContent = atob(content);

      // Create a Blob from the decoded content
      // const blob = new Blob([decodedContent], { type: "application/pdf" });

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${content}`;
      link.download = `${assignmentUuid}.pdf`; // Set a meaningful filename
      link.click();
    } catch (error) {
      console.error("Error handling assignment response:", error);
      // Handle the error or provide feedback to the user
    }
  };

  useEffect(() => {
    getAssignmentDetails();
  }, [assignmentUuid]);

  const deleteAssignment = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/delete-assignment/${assignmentUuid}`;
      const resp = await axios.delete(url, { withCredentials: true });
      console.log(resp);
      location.href = "/assignments";
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOwnSolution = async (solutionUuid: string) => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/delete-own-solution/${solutionUuid}`;
    const resp = await axios.delete(url, { withCredentials: true });
    console.log(resp);
    setSolutions((prevSolutions) =>
      prevSolutions.filter(
        (solution) => solution.solution_uuid !== solutionUuid
      )
    );
    toast.success("Solution Deleted!");
  };

  const deleteSolution = async (solutionUuid: string) => {
    if (!(role === 1 || role === 2)) {
      toast.error("That Action is unauthorized");
    }
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/delete-solution/${solutionUuid}`;
    const resp = await axios.delete(url, { withCredentials: true });
    setSolutions((prevSolutions) =>
      prevSolutions.filter(
        (solution) => solution.solution_uuid !== solutionUuid
      )
    );
    toast.success("Solution Deleted!");
  };
  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        <div className="w-full h-full mt-10 flex flex-col">
          {!loading ? (
            <>
              <div className="">
                <div className="flex items-center gap-3 p-3">
                  <Image
                    alt="arrow"
                    onClick={() => router.back()}
                    src={"/assets/blueBackArrow.png"}
                    width={60}
                    height={60}
                  />
                  <h1 className="font-base font-light text-[50px] text-custom-blue">
                    {title}
                  </h1>
                </div>
                <div className="description-section flex justify-center">
                  <div className="w-[88%] bg-primary-complement p-3 flex flex-col">
                    <div className="w-full flex justify-between">
                      <h1 className="text-custom-blue font-base text-3xl mb-1">
                        Decription:
                      </h1>
                      {isAuthenticated && role === 2 && (
                        <Image
                          onClick={deleteAssignment}
                          alt="delete"
                          src={"/assets/redBin.png"}
                          height={40}
                          width={40}
                        />
                      )}
                    </div>
                    {description != null && description != undefined ? (
                      <div className="font-base text-xl text-[#C3C3C3] mb-5">
                        {description}
                      </div>
                    ) : (
                      <div>
                        <p className="font-base text-2xl text-[#C3C3C3]">
                          No Description Provided
                        </p>
                      </div>
                    )}
                    {link != null && (
                      <div>
                        <p className="text-[#C3C3C3] font-base text-xl">
                          Link:
                          <Link
                            target="_blank"
                            href={link}
                            className="text-custom-blue"
                          >
                            {" "}
                            {link}
                          </Link>
                        </p>
                        {content != null && (
                          <button
                            className="text-custom-blue font-base text-2xl mt-2 hover:text-white duration-150 cursor-pointer"
                            onClick={() => handleBase64Response(content)}
                          >
                            Download Assignment Pdf
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="solution-section flex flex-col items-center mt-10">
                  <h2 className="w-[88%] font-base text-custom-blue text-5xl font-light my-2">
                    Solutions:
                  </h2>
                  <div className="flex flex-col w-[88%] justify-between gap-5">
                    {solutions.map((solution) => (
                      <div className="bg-primary-complement p-3 flex flex-col">
                        <div className="flex justify-between mb-2">
                          <h1 className="text-custom-blue font-base text-3xl">
                            Decription:
                          </h1>
                          <div className="flex space-x-3 items-center">
                            {userUuid !== solution.user_uuid ? (
                              <>
                                <p className="text-custom-blue font-base text-2xl font-light posted-by">
                                  Posted by: {solution.username}
                                </p>
                                {(role === 2 || role === 1) && (
                                  <>
                                    {" "}
                                    <Image
                                      onClick={() =>
                                        deleteSolution(solution.solution_uuid)
                                      }
                                      alt="delete"
                                      src={"/assets/redBin.png"}
                                      height={40}
                                      width={40}
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <Image
                                  onClick={() =>
                                    deleteOwnSolution(solution.solution_uuid)
                                  }
                                  alt="delete"
                                  src={"/assets/blueBin.png"}
                                  height={40}
                                  width={40}
                                />
                              </>
                            )}
                          </div>
                        </div>
                        {solution.description != null &&
                        solution.description != undefined ? (
                          <div className="font-base text-xl text-[#C3C3C3] mb-3">
                            {solution.description}
                          </div>
                        ) : (
                          <div>
                            <p className="font-base text-2xl text-[#C3C3C3]">
                              No Description Provided
                            </p>
                          </div>
                        )}
                        <div className="">
                          {solution.content != null && (
                            <button
                              className="text-custom-blue text-left block font-base text-2xl hover:text-white duration-150 cursor-pointer"
                              onClick={() =>
                                handleBase64Response(solution.content)
                              }
                            >
                              Download Solution Pdf
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[80vh]">
              <PacmanLoader color="#4592AF" size={60} loading={loading} />
            </div>
          )}
        </div>
      </PublicLayout>
    </div>
  );
};

export default Assignment;
