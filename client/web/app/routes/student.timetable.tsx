import { LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dashboard } from "~/components/dashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "Resources | KaizenKlass" },
    { property: "og:title", content: "Timetable | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

const Timetable = () => {
  const { baseUrl, dayOrder }: { baseUrl: string; dayOrder: number } =
    useLoaderData();

  return (
    <div className="bg-main min-h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="flex justify-between items-center">
          <div className="font-display text-highlightSecondary text-5xl">
            Timetable
          </div>
          <div className="text-3xl font-base text-highlightSecondary font-bold">
            Day Order {dayOrder}{" "}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Timetable;

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
    // * fetching day order
    const scraperResp = await axios.post(`${process.env.SCRAPER_DOMAIN}/do`);
    const dayOrder = Number(scraperResp.data.day_order.trim());
    const data = {
      baseUrl,
      dayOrder,
    };
    return data;
  } catch (err) {
    return redirect("/login");
  }
};
