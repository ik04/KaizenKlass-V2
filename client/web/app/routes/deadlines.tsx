import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackButton } from "~/components/backButton";
import { Dashboard } from "~/components/dashboard";
import { DeadlineCard } from "~/components/deadlineCard";
import { EmptyState } from "~/components/emptyState";
import { toast } from "~/components/ui/use-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "Deadlines | KaizenKlass" },
    { property: "og:title", content: "Deadlines | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export default function deadlines() {
  const {
    assignments,
    baseUrl,
    error,
  }: {
    assignments: AssignmentWithDeadline[];
    baseUrl: string;
    error: { message: string };
  } = useLoaderData();
  const [isEmpty, setIsEmpty] = useState<boolean>();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error Fetching Deadlines",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
    if (assignments.length === 0) {
      setIsEmpty(true);
    }
  }, []);

  return (
    <div className="bg-main h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="header w-full h-20 mb-10 flex justify-between items-center text-5xl">
          {/* <BackButton /> */}
          <div className="font-display text-highlightSecondary">Deadlines</div>
        </div>
        {!isEmpty ? (
          <div className="flex flex-col space-y-7 mb-20">
            {assignments.map((assignment) => (
              <DeadlineCard
                subject_uuid={assignment.subject_uuid}
                subject={assignment.subject}
                assignment_uuid={assignment.assignment_uuid}
                title={assignment.title}
                deadline={assignment.deadline}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </Dashboard>
    </div>
  );
}

export const loader = async () => {
  try {
    const url = `${process.env.PUBLIC_DOMAIN}/api/v1/get-deadlines`;
    const resp = await axios.get(url);
    const data = {
      assignments: resp.data.assignments,
      baseUrl: process.env.PUBLIC_DOMAIN,
    };
    return data;
  } catch (error) {
    console.error("Loader error:", error);
    return {
      error: {
        message: "Failed to fetch deadlines. Please try again later.",
      },
    };
  }
};
