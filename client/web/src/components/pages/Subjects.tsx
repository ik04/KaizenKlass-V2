"use client";
import PublicLayout from "../PublicLayout";
import { SubjectCard } from "../SubjectCard";
import { GlobalContext } from "../../app/context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";

interface Subject {
  subject: string;
  subject_uuid: string;
}

const Subjects = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { updateCurrentPage } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }
  const getSubjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    console.log(resp.data.subjects);
    setSubjects(resp.data.subjects);
    setLoading(false);
  };
  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        {!loading ? (
          <>
            <div className="grid grid-cols-4 w-full h-full mt-10">
              {subjects.map((subject, index) => (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, rotate: 20 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    className="m-2"
                  >
                    <SubjectCard
                      subject={subject.subject}
                      subjectUuid={subject.subject_uuid}
                      key={index}
                    />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex justify-center items-center h-[100vh]">
              <PacmanLoader color="#4592AF" size={60} loading={loading} />
            </div>
          </>
        )}
      </PublicLayout>
    </div>
  );
};

export default Subjects;
