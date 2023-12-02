import { Link } from "@remix-run/react";
import React, { useContext } from "react";
import { GlobalContext } from "~/context/GlobalContext";

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, username } = useContext(GlobalContext);
  const sidebarIcons = [
    { href: "/home", img: "/assets/home.svg", name: "home" },
    {
      href: "/assignments",
      img: "/assets/assignments.svg",
      name: "assignments",
    },
    { href: "/deadlines", img: "/assets/skull.svg", name: "deadlines" },
  ];
  const navlinks = [{ name: "login", href: "/login" }];
  const authLinks = [{ name: username, href: "/profile" }];

  // todo: add active state
  return (
    <div className="flex-col h-screen fixed">
      <div className="w-screen bg-dashboard flex justify-between items-center h-28">
        <div className="flex justify-start items-center px-10 space-x-10">
          <img src="/assets/hamburger.svg" alt="hamburger" className="w-16" />
          <Link to={"/"} className="text-highlight font-display text-[55px]">
            KaizenKlass
          </Link>
        </div>
        <div className="nav-links flex justify-between px-10">
          {!isAuthenticated ? (
            <>
              {navlinks.map((navlink) => (
                <Link
                  key={navlink.name}
                  to={navlink.href}
                  className="text-highlight text-2xl uppercase font-base"
                >
                  {navlink.name}
                </Link>
              ))}
            </>
          ) : (
            <>
              {authLinks.map((navlink) => (
                <Link
                  key={navlink.name}
                  to={navlink.href}
                  className="text-highlight text-2xl uppercase font-base"
                >
                  {navlink.name}
                </Link>
              ))}
            </>
          )}
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
