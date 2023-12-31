import { Label } from "@radix-ui/react-label";
import { useLoaderData, useNavigate } from "@remix-run/react";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-hook-form";
import { BackButton } from "~/components/backButton";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";

export default function login() {
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  // console.log(baseUrl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      if (!email || !password) {
        toast({
          title: "Invalid Inputs",
          description: "Please provide both email and password.",
          variant: "destructive",
        });
        return;
      }
      const resp = await axios.post(`${baseUrl}/api/v1/login`, {
        email,
        password,
      });
      location.href = "/home";
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        toast({
          title: "Invalid Credentials",
          description: `${error.response.data.message}`,
          variant: "destructive",
        });
      } else if (error.response && error.response.status === 422) {
        if (!error.response.data.errors.email) {
          toast({
            title: "Invalid Fields Inputs",
            description: `${error.response.data.errors.password}`,
            variant: "destructive",
          });
        } else if (!error.response.data.errors.password) {
          toast({
            title: "Invalid Fields Inputs",
            description: `${error.response.data.errors.email}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Invalid Fields Inputs",
            description: `${error.response.data.errors.email} and ${error.response.data.errors.password}`,
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="">
      <div className="w-full p-3 flex bg-main justify-start items-center">
        <BackButton />
      </div>
      <div className="bg-main h-[93.6vh] flex flex-col justify-center items-center">
        <div className="">
          <h1 className="text-highlight text-4xl font-display">KaizenKlass</h1>
          <Label>Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
          />
          <Label>Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="........."
            type="password"
          />
          <div
            onClick={login}
            className="font-base text-highlightSecondary border border-highlightSecondary cursor-pointer hover:bg-highlightSecondary hover:text-main duration-150 transition-all p-2 my-5 flex justify-center items-center text-xl"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = async () => {
  const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
  return { baseUrl };
};
