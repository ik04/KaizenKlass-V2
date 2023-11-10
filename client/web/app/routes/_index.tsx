import type { MetaFunction } from "@remix-run/node";
import { Landing } from "~/components/landing";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="">
      <Landing />
    </div>
  );
}
