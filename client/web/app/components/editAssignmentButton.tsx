import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import Calendar from "react-calendar";
import { format, set } from "date-fns";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const EditAssignmentButton = ({
  baseUrl,
  assignmentUuid,
  originalSubjectUuid,
  originalTitle,
  originalDescription,
  originalLink,
  handleEditAssignment,
  originalDeadline,
}: {
  baseUrl: string;
  assignmentUuid: string;
  originalSubjectUuid: string;
  originalTitle: string;
  originalDescription?: string;
  originalLink: string;
  originalDeadline?: string;
  handleEditAssignment: (assignment: Assignment) => void;
}) => {
  const { toast } = useToast();
  const splitDateAndTime = (dateTimeString: string) => {
    const dateTimeParts = dateTimeString.split(" ");
    const dateString = dateTimeParts[0];
    const timeString = dateTimeParts[1];
    return { dateString, timeString };
  };

  const {
    dateString,
    timeString,
  }: { dateString?: string | null; timeString?: string | null } =
    originalDeadline
      ? splitDateAndTime(originalDeadline)
      : { dateString: null, timeString: null };

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<string>(originalSubjectUuid);
  const [title, setTitle] = useState<string>(originalTitle);
  const [description, setDescription] = useState<string>(
    originalDescription ?? ""
  );
  const [content, setContent] = useState<string>();
  const [date, setDate] = useState<Date | null>(
    dateString ? new Date(dateString) : null
  );
  const [time, setTime] = useState<string | null>(
    timeString ? timeString : null
  );
  const [open, setOpen] = useState<boolean>(false);
  const [isDatePicked, setIsDatePicked] = useState<boolean>(
    timeString ? true : false
  );

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
    try {
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
      const resp = await axios.put(
        `${baseUrl}/api/v1/edit-assignment/${assignmentUuid}`,
        {
          title,
          content,
          description,
          subject_uuid: subject,
          deadline: combinedDeadline,
        }
      );
      // console.log(resp);
      toast({
        title: "Assignment Updated!",
      });
      handleEditAssignment(resp.data.assignment);
      setOpen(false);
      // resetFields();
      // location.reload();
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
      setIsDatePicked(true);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
      setIsDatePicked(true);
    }
  };
  // const resetFields = () => {
  //   setTitle("");
  //   setDescription("");
  //   setContent("");
  //   setDate(null);
  //   setIsDatePicked(false);
  //   setTime("");
  // };

  // todo: add datetime picker
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <img src="/assets/pencil.png" className="w-7" alt="" />
      </DialogTrigger>
      <DialogContent>
        <div className="font-base flex flex-col space-y-2">
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
                  value={time || ""}
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
          {/* get the right component */}
          <Label>Content</Label>
          <Input
            placeholder="Add new content link"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div
          onClick={editAssignment}
          className="hover:text-dashboard text-xs md:text-base text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
        >
          Update
        </div>
      </DialogContent>
    </Dialog>
  );
};
