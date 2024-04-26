import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios, { AxiosRequestConfig } from "axios";
import React, { useState } from "react";
import { Dashboard } from "~/components/dashboard";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";

const StudentLogin = () => {
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = () => {
    if (!(email && password)) {
      toast({
        title: "both email and password are required",
        description: "please fill in all fields",
        variant: "destructive",
      });
      console.log(email, password);
    }
  };
  return (
    <div className="bg-main min-h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="flex flex-col justify-center space-y-3 items-center h-[90%]">
          <div className="md:w-[30%] flex flex-col space-y-4">
            <h1 className="text-4xl font-display text-highlightSecondary text-center capitalize">
              Login to fetch details
            </h1>
            <div className="">
              <Label className="text-highlightSecondary font-base capitalize">
                srm email
              </Label>
              <Input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
              />
            </div>
            <div className="">
              <Label className="font-base text-highlightSecondary">
                Password
              </Label>
              <Input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........."
                type="password"
              />
            </div>
            <div
              onClick={login}
              className="font-base text-highlightSecondary border border-highlightSecondary cursor-pointer hover:bg-highlightSecondary hover:text-main duration-150 transition-all p-2 my-5 flex justify-center items-center text-xl"
            >
              Login
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default StudentLogin;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
    const cookies = request.headers.get("cookie");

    if (!cookies) {
      throw new Error("No cookies found in the request headers");
    }

    const resp = await axios.get(`${baseUrl}/api/v1/user-data`, {
      headers: {
        Cookie: cookies,
      },
    });

    const accessToken = resp.data.access_token;

    const isLog = await axios.get(`${baseUrl}/api/v1/is-log`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(isLog.status);
    if (isLog.status !== 204) {
      throw new Error("Unauthorized access");
    }
    const data = {
      baseUrl,
      atToken: accessToken,
    };

    return data;
  } catch (err) {
    return redirect("/login");
  }
};
