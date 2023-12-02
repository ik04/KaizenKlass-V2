import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const AddSubjectAssignmentButton = ({
  baseUrl,
  subjectUuid,
}: {
  baseUrl: string;
  subjectUuid: string;
}) => {
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
          <Input />
          <Label>Description</Label>
          <Textarea />
        </div>
      </DialogContent>
    </Dialog>
  );
};
