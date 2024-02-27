import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "Not Found | KaizenKlass" },
    { property: "og:title", content: "Not Found | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export default function notFound() {
  const { baseUrl }: { baseUrl: string } = useLoaderData();

  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="h-full">
          <div className="w-full p-3 flex bg-main justify-start items-center">
            <BackButton />
          </div>
          <div className="flex justify-center items-center h-[70%] w-full">
            <div className="flex flex-col  items-center justify-center">
              <img src="/assets/error.png" className="md:w-32" alt="" />
              <div className="font-base text-highlightSecondary md:text-3xl text-2xl font-bold">
                Not Found
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export const loader = async () => {
  const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
  return { baseUrl };
};
