import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { SelectItem } from "@radix-ui/react-select";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "@remix-run/react";
import Calendar from "react-calendar";
import { formatDate } from "node_modules/react-calendar/dist/esm/shared/dateFormatter";
import { format } from "date-fns";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AddAssignmentButton = ({ baseUrl }: { baseUrl: string }) => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [link, setLink] = useState<string>();
  const [content, setContent] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);

  const getSubjects = async () => {
    const url = `${baseUrl}/api/v1/get-subjects`;
    const resp = await axios.get(url);
    setSubjects(resp.data.subjects);
  };
  const navigate = useNavigate();

  useEffect(() => {
    getSubjects();
  }, []);

  const addAssignment = async () => {
    try {
      if (subject && title) {
        const resp = await axios.post(`${baseUrl}/api/v1/add-assignment`, {
          title,
          content,
          link,
          description,
          subject_uuid: subject,
          deadline: date && format(date, "yyyy-MM-dd"),
        });
        toast({
          title: "Assignment Added!",
          description: `${title} has been added to the assignments`,
        });
        navigate(`/assignment/${resp.data.assignment.assignment_uuid}`);
        location.reload();
      } else {
        toast({
          title: "Required fields",
          variant: "destructive",
          description: `Add both title and subject`,
        });
      }
    } catch (error: any) {
      console.log(error.response);

      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;

        if (errors) {
          let errorMessages = "";

          for (const [key, value] of Object.entries(errors)) {
            // Iterate through each error message for a specific key
            if (Array.isArray(value)) {
              errorMessages += `${key}: ${value.join(", ")}\n`;
            }
          }

          toast({
            title: "Invalid Fields Inputs",
            description: errorMessages.trim(),
            variant: "destructive",
          });
        } else {
          console.error("Unexpected error:", error);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  const resetFields = () => {
    setSubject("");
    setTitle("");
    setDescription("");
    setLink("");
    setContent("");
    setDate(null);
  };

  // todo: add datetime picker
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
        <div className="font-base">
          <div className="flex flex-col">
            <Label>Subject</Label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              name=""
              placeholder="select subject"
              className="py-2 my-2 bg-white text-sm rounded-sm"
              id=""
            >
              <option value="" className="text-[#737373]" disabled selected>
                Select Subject
              </option>
              {subjects.map((subject) => (
                <option className="p-4" value={subject.subject_uuid}>
                  {subject.subject}
                </option>
              ))}
            </select>
          </div>
          {/* <Select required onValueChange={(value) => setSubject(value)}>
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
          </Select> */}
          <Label>Title</Label>
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Label>Description</Label>
          <Textarea
            value={description}
            placeholder="description (optional)"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label>Deadline</Label>
          <div className="bg-highlightSecondary rounded-md p-5 flex space-y-7 flex-col">
            <Calendar onChange={handleDateChange} value={date} />
            {date && <p>Selected date: {format(date, "yyyy-MM-dd")}</p>}
          </div>
          {/* get the right component */}
          <Label>Link</Label>
          <Input
            placeholder="Link to classroom"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Label>Content</Label>
          <Input
            value={content}
            placeholder="Drive link of assignment (a share link of the pdf)"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 items-center">
          <div
            onClick={resetFields}
            className="hover:text-dashboard text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
          >
            Reset
          </div>
          <div
            onClick={addAssignment}
            className="hover:text-dashboard text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
          >
            Submit
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
