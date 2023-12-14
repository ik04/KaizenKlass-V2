import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import { Dashboard } from "~/components/dashboard";
import { ResourceCard } from "~/components/resourceCard";

export default function resources() {
  const { baseUrl, resources }: { baseUrl: string; resources: Resource[] } =
    useLoaderData();
  console.log(resources);

  return (
    <div className="bg-main h-screen grid grid-cols-4">
      <Dashboard baseUrl={baseUrl}>
        <div className="flex">
          {resources.map((resource) => (
            <div className="px-10">
              <ResourceCard
                title={resource.title}
                description={resource.description}
                link={resource.link}
                type={resource.type}
              />
            </div>
          ))}
        </div>
      </Dashboard>
    </div>
  );
}
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
