import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";
import { SelectItem } from "@radix-ui/react-select";

export const AddAssignmentButton = ({ baseUrl }: { baseUrl: string }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<string>();

  const getSubjects = async () => {
    const url = `${baseUrl}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    setSubjects(resp.data.subjects);
  };
  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="h-32 flex rounded-2xl flex-col items-start justify-center border-dashed border-2 hover:border-highlight border-mainLighter duration-200 transition-all space-y-3 px-5">
          <p className="font-base text-highlightSecondary text-3xl">
            Add Assignment
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="">
          <Label>Subject</Label>
          <Select required onValueChange={(value) => setSubject(value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem
                  className="cursor-pointer"
                  value={subject.subject_uuid}
                >
                  <p className="text-black">{subject.subject.toString()}</p>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Title</Label>
          <Input />
          <Label>Description</Label>
          <Textarea />
        </div>
      </DialogContent>
    </Dialog>
  );
};
