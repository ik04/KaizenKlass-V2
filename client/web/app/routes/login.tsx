import { Label } from "@radix-ui/react-label";
import React from "react";
import { Form } from "react-hook-form";
import { Input } from "~/components/ui/input";

export default function login() {
  return (
    <div className="bg-main h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-highlight text-4xl font-display">Login</h1>
        <Label>Email</Label>
        <Input placeholder="example@domain.com" />
        <Label>Password</Label>
        <Input placeholder="........." />
      </div>
    </div>
  );
}
