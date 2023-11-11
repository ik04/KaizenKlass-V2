import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/about";
import { Landing } from "~/components/landing";

export const meta: MetaFunction = () => {
  return [
    { title: "KaizenKlass" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="">
      <Landing />
      <About />
    </div>
  );
}
