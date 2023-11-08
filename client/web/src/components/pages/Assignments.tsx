"use client";
import React, { useEffect, useState, useContext, ChangeEvent } from "react";
import { GlobalContext } from "../../app/context/GlobalContext";
import PublicLayout from "../PublicLayout";
import { PacmanLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { buttonVariants } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Assignment {
  title: string;
  assignment_uuid: string;
  subject: string;
}
interface Subject {
  subject: string;
  subject_uuid: string;
}
interface AssignmentFields {
  title: string;
  description: string;
  link: string;
  subject: string;
}

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState<File | null>(null);

  const router = useRouter();

  const getSubjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    console.log(resp.data.subjects);
    setSubjects(resp.data.subjects);
    setLoading(false);
  };

  const getAssignmentsWithSubjects = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/get-assignment-subjects`;
      const resp = await axios.get(url);
      setAssignments(resp.data.assignments);
    } catch (error) {
      console.log(error);
    }
  };

  const { updateCurrentPage, role } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("classwork");
  }

  useEffect(() => {
    getAssignmentsWithSubjects();
    getSubjects();
  }, []);

  const handleAddAssignment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(content);

    const formData = new FormData();
    formData.append("title", title);

    if (description.trim() !== "") {
      formData.append("description", description);
    } else {
      formData.append("description", "");
    }

    if (link.trim() !== "") {
      formData.append("link", link);
    } else {
      formData.append("link", "");
    }

    formData.append("subject_uuid", subject);

    if (content !== null && content !== undefined) {
      formData.append("content", content, content.name);
    }
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/add-assignment`;
      const resp = await axios.post(url, formData, { withCredentials: true });
      console.log(resp);
      toast.success("Assignment Added!");
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setContent(file || null);
  // };
  return (
    <div className="h-screen bg-primary overflow-auto">
      <PublicLayout>
        <div className="w-full h-full mt-10 flex flex-col">
          {!loading ? (
            <>
              <div className="">
                <div className="flex items-center gap-3 p-3">
                  <h1 className="font-base font-light text-[50px] text-custom-blue">
                    Assignments
                  </h1>
                </div>
                <div className="flex flex-col justify-between">
                  {assignments.map((assignment) => (
                    <Link href={`/assignment/${assignment.assignment_uuid}`}>
                      <div className="h-[180px] bg-primary-complement text-custom-blue px-5 rounded-[20px] flex flex-col justify-center my-3 hover:text-white duration-300 transition-all">
                        <div className="flex justify-between items-center w-full ">
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
                        <div className="font-base text-gray-400 text-2xl">
                          {assignment.subject}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {role === 2 && (
                    <Dialog>
                      <DialogTrigger>
                        <div className="cursor-pointer h-[180px] bg-primary-complement text-custom-blue px-5 rounded-[20px] flex flex-col justify-center my-3 hover:text-white duration-300 transition-all">
                          <div className="flex space-x-4 items-center w-full ">
                            <h2 className="font-base text-[40px] font-light">
                              Add New Assignment
                            </h2>
                            <Image
                              src={"/assets/addButton.png"}
                              alt="arrow"
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <form
                          action=""
                          className="flex flex-col space-y-5"
                          onSubmit={handleAddAssignment}
                        >
                          <DialogHeader>
                            <DialogTitle className="text-4xl font-light font-base p-3">
                              Add Assignment
                            </DialogTitle>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="title"
                                  className="text-right text-gray-400"
                                >
                                  Title
                                </Label>
                                <Input
                                  required
                                  id="title"
                                  onChange={(e) => setTitle(e.target.value)}
                                  placeholder="Title"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="description"
                                  className="text-right text-gray-400"
                                >
                                  Description
                                </Label>
                                <Textarea
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  id="description"
                                  placeholder="Description"
                                  className="col-span-3"
                                />
                              </div>
                            </div>{" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="title"
                                className="text-right text-gray-400"
                              >
                                Subject
                              </Label>
                              {/*? cache subjects in storage */}
                              <Select
                                required
                                onValueChange={(value) => setSubject(value)}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  {subjects.map((subject) => (
                                    <SelectItem value={subject.subject_uuid}>
                                      {subject.subject}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </DialogHeader>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="link"
                              className="text-right text-gray-400"
                            >
                              Link
                            </Label>
                            <Input
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              id="link"
                              placeholder="Link to source"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid w-full max-w-md gap-4">
                            <Label htmlFor="content" className="text-gray-400">
                              Assignment Pdf
                            </Label>
                            <Input
                              id="content"
                              type="file"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setContent(e.target.files?.[0] || null)
                              }
                            />
                          </div>
                          {/* get criticism */}
                          <Button
                            type="submit"
                            className={buttonVariants({ variant: "kaizen" })}
                          >
                            Add Assignment
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  )}
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

export default Assignments;
