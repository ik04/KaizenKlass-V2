import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { SelectItem } from "@radix-ui/react-select";
import { useToast } from "./ui/use-toast";

export const EditAssignmentButton = ({
  baseUrl,
  assignmentUuid,
  originalSubjectUuid,
  originalTitle,
  originalDescription,
  originalLink,
}: {
  baseUrl: string;
  assignmentUuid: string;
  originalSubjectUuid: string;
  originalTitle: string;
  originalDescription?: string;
  originalLink: string;
}) => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<string>(originalSubjectUuid);
  const [title, setTitle] = useState<string>(originalTitle);
  const [description, setDescription] = useState<string>(
    originalDescription ?? ""
  );
  const [link, setLink] = useState<string>(originalLink);
  const [content, setContent] = useState<string>();

  const getSubjects = async () => {
    const url = `${baseUrl}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    setSubjects(resp.data.subjects);
  };
  // ! alot of refactors needed
  useEffect(() => {
    getSubjects();
  }, []);
  const editAssignment = async () => {
    const resp = await axios.put(
      `${baseUrl}/api/v1/edit-assignment/${assignmentUuid}`,
      {
        title,
        content,
        link,
        description,
        subject_uuid: subject,
      }
    );
    console.log(resp);
    toast({
      title: "Assignment Updated!",
    });
    location.reload();
  };

  // todo: add datetime picker
  return (
    <Dialog>
      <DialogTrigger className="">
        <img src="/assets/pencil.png" className="w-7 mb-2" alt="" />
      </DialogTrigger>
      <DialogContent>
        <div className="font-base">
          <Label>Subject</Label>
          <Select
            value={originalSubjectUuid}
            required
            onValueChange={(value) => setSubject(value)}
          >
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
          <Input
            placeholder="New Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Label>Description</Label>
          <Textarea
            placeholder="updated description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <Label>Deadline</Label> */}
          {/* get the right component */}
          <Label>Link</Label>
          <Input
            value={link}
            placeholder="New Link to classroom"
            onChange={(e) => setLink(e.target.value)}
          />
          <Label>Content</Label>
          <Input
            placeholder="Add new content link"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div
          onClick={editAssignment}
          className="hover:text-dashboard text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
        >
          Update
        </div>
      </DialogContent>
    </Dialog>
  );
};
