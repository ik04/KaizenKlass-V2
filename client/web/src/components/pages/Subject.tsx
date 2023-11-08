"use client";
import React, { useEffect, useState, useContext } from "react";
import PublicLayout from "../../components/PublicLayout";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";

import { PacmanLoader } from "react-spinners";

interface Assignment {
  assignment_uuid: string;
  title: string;
}

const Subject = ({ subjectUuid }: { subjectUuid: string }) => {
  const [subjectName, setSubjectName] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCurrentPage } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }

  const getSubjectAssignments = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subject-assignments/${subjectUuid}`;
      const resp = await axios.get(url);
      console.log(resp.data);
      setSubjectName(resp.data.subject);
      setAssignments(resp.data.assignments);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subjectUuid != undefined) {
      getSubjectAssignments();
    }
  }, [subjectUuid]);

  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        {!loading ? (
          <>
            <div className="w-full h-full mt-10 flex flex-col">
              <div className="">
                <div className="flex items-center gap-3 p-3">
                  <Link href={"/subjects"}>
                    <Image
                      alt="arrow"
                      src={"/assets/blueBackArrow.png"}
                      width={60}
                      height={60}
                    />
                  </Link>
                  <h1 className="font-base font-light text-[50px] text-custom-blue">
                    {subjectName}
                  </h1>
                </div>
                <div className="flex flex-col justify-between">
                  {assignments.map((assignment) => (
                    <Link
                      href={`/assignment/${assignment.assignment_uuid}`}
                      className="h-[180px] bg-primary-complement text-custom-blue rounded-[20px] flex items-center my-3 hover:text-white duration-300 transition-all"
                    >
                      <div className="flex justify-between items-center w-full px-5">
                        <h2 className="font-base text-[40px] font-light">
                          {assignment.title}
                        </h2>
                        <Image
                          src={"/assets/blueRightArrow.png"}
                          alt="arrow"
                          width={65}
                          height={65}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-[100vh]">
              <PacmanLoader color="#4592AF" size={60} loading={loading} />
            </div>
          </>
        )}
      </PublicLayout>
    </div>
  );
};
// todo : list assignments by subject here but in aiggnments page just list out all assignments
export default Subject;
