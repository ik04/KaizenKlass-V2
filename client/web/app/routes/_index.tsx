import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/about";
import { Landing } from "~/components/landing";

export const meta: MetaFunction = () => {
  return [
    { title: "KaizenKlass" },
    { property: "og:title", content: "KaizenKlass" },
    {
      name: "description",
      content:
        "a community of people who are willing to collaborate and help each other out with the ever pressing issue of assignments",
    },
    {
      property: "og:description",
      content:
        "a community of people who are willing to collaborate and help each other out with the ever pressing issue of assignments",
    },
    {
      property: "og:image",
      content: "https://kaizenklass.me/assets/meta.png",
    },
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
