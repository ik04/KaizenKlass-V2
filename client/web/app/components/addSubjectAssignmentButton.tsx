import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "@remix-run/react";
import Calendar from "react-calendar";
import { format } from "date-fns";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AddSubjectAssignmentButton = ({
  baseUrl,
  subjectUuid,
}: {
  baseUrl: string;
  subjectUuid: string;
}) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [link, setLink] = useState<string>();
  const [content, setContent] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const addAssignment = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/api/v1/add-assignment`, {
        title,
        content,
        link,
        description,
        subject_uuid: subjectUuid,
        deadline: date && format(date, "yyyy-MM-dd"),
      });
      // console.log(resp);
      toast({
        title: "Assignment Added!",
        description: `${title} has been added to the assignments`,
      });
      // navigate(`/assignment/${resp.data.assignment.assignment_uuid}`);
      location.reload();
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
          <Label>Title</Label>
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Label>Description</Label>
          <Textarea
            placeholder="description (optional)"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label>Deadline</Label>
          <div className="bg-highlightSecondary rounded-md p-5 flex space-y-7 flex-col">
            <Calendar onChange={handleDateChange} value={date} />
            {date && <p>Selected date: {format(date, "yyyy-MM-dd")}</p>}
          </div>{" "}
          <Label>Link</Label>
          <Input
            placeholder="Link to classroom"
            onChange={(e) => setLink(e.target.value)}
          />
          <Label>Content</Label>
          <Input
            placeholder="Drive link of assignment (a share link of the pdf)"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div
          onClick={addAssignment}
          className="hover:text-dashboard text-xs md:text-base text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
        >
          Submit
        </div>
      </DialogContent>
    </Dialog>
  );
};
