import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/landing/about";
import Contact from "~/components/landing/contact";
import { Landing } from "~/components/landing/landing";

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
      itemprop: "image",
      content: "https://kaizenklass.me/assets/meta.png",
    },
    {
      property: "og:image:width",
      content: "526",
    },
    {
      property: "og:image:height",
      content: "275",
    },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    {
      name: "google-site-verification",
      content: "PVW1Id7YH-t3UONzxnAXOy9gbT5r02V2t_x0Tll9ong",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export default function Index() {
  return (
    <main className="w-full min-h-screen">
      <Landing />
      <About />
      <Contact />
    </main>
  );
}
