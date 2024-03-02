import { MetaFunction } from "@remix-run/node";
import React from "react";
import { About } from "~/components/contribute/about";
import { Landing } from "~/components/contribute/landing";

export const meta: MetaFunction = () => {
  return [
    { title: "Contribute | KaizenKlass" },
    { property: "og:title", content: "Contribute | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};
const Contribute = () => {
  return (
    <div>
      <Landing />
      <About />
    </div>
  );
};

export default Contribute;
