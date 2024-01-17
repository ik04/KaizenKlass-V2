import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Dashboard } from "~/components/dashboard";

export default function notFound() {
  const { baseUrl }: { baseUrl: string } = useLoaderData();

  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className=""></div>
      </Dashboard>
    </div>
  );
}

export const loader = async () => {
  const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
  return { baseUrl };
};
