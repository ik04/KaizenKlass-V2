import { Link } from "@remix-run/react";
import React from "react";

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const sidebarIcons = [
    { href: "/home", img: "/assets/home.svg", name: "home" },
    {
      href: "/assignments",
      img: "/assets/assignments.svg",
      name: "assignments",
    },
    { href: "/deadlines", img: "/assets/skull.svg", name: "deadlines" },
  ];
  return (
    <div className="flex-col h-screen fixed">
      <div className="w-screen bg-dashboard flex justify-start items-center px-10 space-x-10 h-28">
        <img src="/assets/hamburger.svg" alt="hamburger" className="w-16" />
        <div className="text-highlight font-display text-[55px]">
          KaizenKlass
        </div>
      </div>
      <div className="sidebar-and-content flex h-full w-full">
        <div className="sidebar h-full bg-dashboard items-center space-y-20 w-[150px] py-10 flex flex-col">
          {sidebarIcons.map((icon) => (
            <Link key={icon.name} to={icon.href}>
              <img src={icon.img} alt={icon.name} />
            </Link>
          ))}
        </div>
        <div className="content overflow-auto w-full px-16 py-10 mb-16">
          {children}
        </div>
      </div>
    </div>
  );
};
