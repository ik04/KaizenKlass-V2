import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import { Dashboard } from "~/components/dashboard";
import { ResourceCard } from "~/components/resourceCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Resources | KaizenKlass" },
    { property: "og:title", content: "Resources | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export default function resources() {
  const { baseUrl, resources }: { baseUrl: string; resources: Resource[] } =
    useLoaderData();
  // console.log(resources);

  return (
    <div className="bg-main min-h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="-ml-5">
          <div className="font-display text-highlightSecondary text-5xl">
            Resources
          </div>
          <div className="justify-center items-center md:grid md:grid-cols-4">
            {resources.map((resource) => (
              <div className="md:px-10 my-9 mr-10">
                <ResourceCard
                  title={resource.title}
                  description={resource.description}
                  link={resource.link}
                  type={resource.type}
                />
              </div>
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

/*
          
*/
export const loader = async () => {
  const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
  const url = `${baseUrl}/api/v1/get-resources`;
  const resp = await axios.get(url);
  const data = {
    baseUrl: baseUrl,
    resources: resp.data.resources,
  };
  return data;
};
