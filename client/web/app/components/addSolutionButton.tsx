import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

export const AddSolutionButton = ({
  baseUrl,
  assignmentUuid,
  handleSolutionAddition,
}: {
  baseUrl: string;
  assignmentUuid: string;
  handleSolutionAddition: (solution: Solution) => void;
}) => {
  const { toast } = useToast();
  const [description, setDescription] = useState<string>();
  const [content, setContent] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const addSolution = async () => {
    try {
      if (description) {
        const resp = await axios.post(`${baseUrl}/api/v1/add-solution`, {
          content,
          description,
          assignment_uuid: assignmentUuid,
        });
        toast({
          title: "Solution Added!",
        });
        handleSolutionAddition(resp.data.solution);
      } else {
        toast({
          title: "Invalid Fields Inputs",
          description: "description is required",
          variant: "destructive",
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <div className="h-32 flex rounded-2xl flex-col items-start justify-center border-dashed border-2 hover:border-highlight border-mainLighter duration-200 transition-all space-y-3 px-5">
          <p className="font-base text-highlightSecondary text-3xl">
            Add Solution
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="">
          <Label>Description</Label>
          <Textarea
            placeholder="description/answer"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label>Content</Label>
          <Input
            placeholder="Drive link of Solution pdf (a share link that is public)"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <DialogClose>
          <div
            onClick={addSolution}
            className="hover:text-dashboard text-xs md:text-base text-highlightSecondary border border-highlightSecondary duration-150 cursor-pointer hover:bg-highlightSecondary w-[15%] justify-center items-center flex p-1 font-base"
          >
            Submit
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
