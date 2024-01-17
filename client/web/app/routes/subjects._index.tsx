import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Dashboard } from "~/components/dashboard";
import { SplashScreen } from "~/components/splashScreen";
import { SubjectCard } from "~/components/subjectCard";
export default function subjects() {
  //
  const { subjects, baseUrl }: { subjects: Subject[]; baseUrl: string } =
    useLoaderData();
  return (
    <div className="bg-main min-h-screen">
      <Dashboard baseUrl={baseUrl}>
        <div className="md:grid flex flex-col md:grid-cols-4">
          {subjects.map((subject) => (
            <div key={subject.subject} className="py-10">
              <SubjectCard
                subject={subject.subject}
                uuid={subject.subject_uuid}
              />
            </div>
          ))}
        </div>
      </Dashboard>
    </div>
  );
}
// todo: make an actual dashboard with useful info to replace subjects page and make subjects page its own thing
// todo: handle server errors (get help)
export async function loader() {
  const url = `${process.env.PUBLIC_DOMAIN}/api/v1/get-subjects`;
  const resp = await axios.get(url);
  const data = {
    subjects: resp.data.subjects,
    baseUrl: process.env.PUBLIC_DOMAIN,
  };
  console.log(process.env.PUBLIC_DOMAIN);
  return data;
}
