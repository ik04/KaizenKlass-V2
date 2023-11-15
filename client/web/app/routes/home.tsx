import { Dashboard } from "~/components/dashboard";
import { SubjectCard } from "~/components/subjectCard";

export default function home() {
  return (
    <div className="bg-primary min-h-screen">
      <Dashboard>
        <SubjectCard subject="DSA" uuid="hello" />
      </Dashboard>
    </div>
  );
}
