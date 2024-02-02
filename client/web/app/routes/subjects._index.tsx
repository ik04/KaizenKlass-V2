import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dashboard } from "~/components/dashboard";
import { SplashScreen } from "~/components/splashScreen";
import { SubjectCard } from "~/components/subjectCard";
import { Skeleton } from "~/components/ui/skeleton";
export default function subjects() {
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const callSubjectsEnpoint = async () => {
      const url = `${baseUrl}/api/v1/get-subjects`;
      const resp = await axios.get(url);
      setSubjects(resp.data.subjects);
      setIsLoading(false);
    };
    callSubjectsEnpoint();
  }, [baseUrl]);
  return (
    <div className="bg-main min-h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="md:grid flex flex-col md:grid-cols-4">
          {!isLoading ? (
            <>
              {subjects.map((subject) => (
                <div key={subject.subject} className="py-10">
                  <SubjectCard
                    subject={subject.subject}
                    uuid={subject.subject_uuid}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 12 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="p-5 mb-11 md:mb-14 h-28 md:p-2 border border-mainLighter md:w-80 md:h-80 rounded-3xl bg-mainLighter transition-all"
                />
              ))}
            </>
          )}
        </div>
      </Dashboard>
    </div>
  );
}
// todo: make an actual dashboard with useful info to replace subjects page and make subjects page its own thing
// todo: handle server errors (get help)
export async function loader() {
  const data = {
    baseUrl: process.env.PUBLIC_DOMAIN,
  };
  console.log(process.env.PUBLIC_DOMAIN);
  return data;
}
