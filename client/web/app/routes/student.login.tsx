import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import axios, { AxiosRequestConfig } from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import { Dashboard } from "~/components/dashboard";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "Student Login | KaizenKlass" },
    { property: "og:title", content: "Student Login | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    const scraperUrl: string = process.env.SCRAPER_DOMAIN || "";
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!(username && password)) {
      throw new Error("Both username and password are required");
    }

    const resp = await axios.post(`${scraperUrl}/login`, {
      username,
      password,
    });

    const token = resp.data.token;

    const expirationDate = new Date();
    expirationDate.setHours(23, 59, 59, 999);
    const formattedExpirationDate = format(
      expirationDate,
      "EEE, dd MMM yyyy HH:mm:ss 'GMT'"
    );

    const cookie = `token=${token}; Path=/; Expires=${formattedExpirationDate}; HttpOnly`;

    const response = redirect("/student/timetable", {
      headers: {
        "Set-Cookie": cookie,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return redirect("/student/login");
  }
}

const StudentLogin = () => {
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  return (
    <div className="bg-main min-h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="flex flex-col justify-center space-y-3 items-center h-[90%]">
          <Form
            method="post"
            action="/student/login"
            className="md:w-[30%] flex flex-col space-y-4"
          >
            <h1 className="text-4xl font-display text-highlightSecondary text-center capitalize">
              Login to fetch details
            </h1>
            <div className="">
              <Label className="text-highlightSecondary font-base capitalize">
                srm username
              </Label>
              <Input name="username" placeholder="jd0000" />
            </div>
            <div className="">
              <Label className="font-base text-highlightSecondary">
                Password
              </Label>
              <Input name="password" placeholder="........." type="password" />
            </div>
            <button
              type="submit"
              className="font-base text-highlightSecondary border border-highlightSecondary cursor-pointer hover:bg-highlightSecondary hover:text-main duration-150 transition-all p-2 my-5 flex justify-center items-center text-xl"
            >
              Login
            </button>
          </Form>
        </div>
      </Dashboard>
    </div>
  );
};

export default StudentLogin;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
    const scraperUrl: string = process.env.SCRAPER_DOMAIN || "";
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
    };

    return data;
  } catch (err) {
    return redirect("/login");
  }
};
