import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/about";
import { Landing } from "~/components/landing";

export const meta: MetaFunction = () => {
  return [
    { title: "KaizenKlass" },
    {
      name: "description",
      content:
        "Welcome to KaizenklassWelcome to our collaborative community! Join us in tackling the perpetual challenge of assignments together. Let's foster a supportive environment where individuals come together to share knowledge, insights, and assistance. We understand the stress that accumulates from assignments, and our goal is to create a space where you not only get the help you need but also gain a deeper understanding of your coursework. Break free from the assignment burden and embark on a learning journey with our collaborative community. Join us today to ease your academic stress and enhance your learning experience through shared knowledge and support!",
    },
    {
      name: "google-adsense-account",
      content: "ca-pub-5217417672318463",
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
