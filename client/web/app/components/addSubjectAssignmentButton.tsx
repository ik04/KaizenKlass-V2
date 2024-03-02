import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";
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
  handleAddAssignment,
}: {
  baseUrl: string;
  subjectUuid: string;
  handleAddAssignment: (assignment: Assignment) => void;
}) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [content, setContent] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isDatePicked, setIsDatePicked] = useState<boolean>(false);
  const [time, setTime] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const addAssignment = async () => {
    try {
      if (subjectUuid && title) {
        if (date && !time) {
          toast({
            title: "Required fields",
            variant: "destructive",
            description: `Add both date and time are required for deadline`,
          });
          return;
        }
        let combinedDeadline = null;
        if (time && date) {
          // Combine date and time
          const deadlineDateTime = new Date(date);
          const [hours, minutes] = time.split(":");
          deadlineDateTime.setHours(parseInt(hours, 10));
          deadlineDateTime.setMinutes(parseInt(minutes, 10));
          deadlineDateTime.setSeconds(0); // Ensure seconds are set to 0
          combinedDeadline = format(deadlineDateTime, "yyyy-MM-dd HH:mm:ss");
          console.log(combinedDeadline);
        }
        const resp = await axios.post(`${baseUrl}/api/v1/add-assignment`, {
          title,
          content,
          description,
          subject_uuid: subjectUuid,
          deadline: combinedDeadline,
        });
        toast({
          title: "Assignment Added!",
          description: `${title} has been added to the assignments`,
        });
        handleAddAssignment(resp.data.assignment);
        resetFields();
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

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setDate(null);
    setIsDatePicked(false);
    setTime("");
  };

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);
      setIsDatePicked(true);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
      setIsDatePicked(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          </div>
          <div className="">
            <Label>Time</Label>
            {isDatePicked ? (
              <>
                <Input
                  type="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </>
            ) : (
              <>
                {" "}
                <Input
                  disabled
                  type="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </>
            )}
          </div>
          <Label>Content</Label>
          <Input
            placeholder="Drive link of assignment (a share link of the pdf)"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <DialogClose>
          <div
            onClick={addAssignment}
            className="hover:text-dashboard text-xs md:text-base text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
          >
            Submit
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
