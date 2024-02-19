import { Link, useLocation } from "@remix-run/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/context/GlobalContext";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

// ! shift dashboard to global ( this is bad practice lmao)
export const Dashboard = ({
  children,
  baseUrl,
}: {
  children: React.ReactNode;
  baseUrl: string;
}) => {
  const { isAuthenticated, username, isSidebarExpanded, setSidebarExpanded } =
    useContext(GlobalContext);
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [isActive, setIsActive] = useState<number>(0);
  const sidebarIcons = [
    { href: "/subjects", img: "/assets/home.svg", name: "home" },
    {
      href: "/assignments",
      img: "/assets/assignments.svg",
      name: "assignments",
    },
    { href: "/deadlines", img: "/assets/skull.svg", name: "deadlines" },
  ];
  const extraSidebarIcons = [
    { href: "/resources", img: "/assets/treasure.svg", name: "resources" },
  ];
  const navlinks = [
    { name: "login", href: "/login" },
    { name: "register", href: "/register" },
  ];
  const authLinks = [{ name: username, href: "/subjects" }];
  const logout = async () => {
    const resp = await axios.post(`${baseUrl}/api/v1/logout`);
    location.reload();
  };
  const locationHook = useLocation();
  const allIcons = sidebarIcons.concat(extraSidebarIcons);

  useEffect(() => {
    allIcons.forEach((icon, index) => {
      if (locationHook.pathname == icon.href) {
        setIsActive(index);
      }
    });
  }, [allIcons]);

  const toggleSidebar = () => {
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) {
      setIsMobileNavExpanded(!isMobileNavExpanded);
    } else if (setSidebarExpanded) {
      setSidebarExpanded(!isSidebarExpanded);
    }
  };
  // todo: add active state
  return (
    <div
      className={`flex-col h-screen fixed ${
        isSidebarExpanded ? "sidebar-expanded" : ""
      }`}
    >
      <div
        className={`w-screen bg-dashboard flex md:justify-between md:items-center md:h-28 h-24 ${
          isSidebarExpanded ? "expanded" : ""
        }`}
      >
        {" "}
        <div className="flex justify-start items-center px-10 space-x-5">
          <img
            onClick={toggleSidebar}
            src="/assets/hamburger.svg"
            alt="hamburger"
            className="md:w-16 w-10"
          />
          {/* make a home page */}
          <Link
            to={"/subjects"}
            className="text-highlight font-display text-4xl md:text-5xl"
          >
            KaizenKlass
          </Link>
        </div>
        {!isAuthenticated ? (
          <div className="nav-links hidden md:flex md:space-x-5 items-center justify-between px-10">
            {navlinks.map((navlink) => (
              <Link
                key={navlink.name}
                to={navlink.href}
                className="text-highlight text-2xl uppercase font-base"
              >
                {navlink.name}
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="nav-links hidden px-10 md:flex space-x-5
           items-center"
          >
            {authLinks.map((navlink) => (
              <Link
                key={navlink.name}
                to={navlink.href}
                className="text-highlight py-3 text-2xl uppercase font-base"
              >
                {navlink.name}
              </Link>
            ))}
            <div
              onClick={logout}
              className="text-highlight hover:text-red-500 cursor-pointer duration-150 text-2xl uppercase font-base"
            >
              Logout
            </div>
          </div>
        )}
      </div>
      <div className="sidebar-and-content flex h-full w-full">
        <div
          className={`sidebar hidden h-full bg-dashboard items-center space-y-12 py-10 md:flex flex-col ${
            isSidebarExpanded
              ? "w-[30%] transition-all duration-300"
              : "transition-all duration-300 w-[150px]"
          }`}
        >
          <TooltipProvider>
            {sidebarIcons.map((icon, index) => (
              <Tooltip>
                <TooltipTrigger className={`${isSidebarExpanded && "w-full"}`}>
                  <Link
                    key={icon.name}
                    className={`${
                      isSidebarExpanded
                        ? `flex  w-full pl-[35px] justify-center items-center p-3 space-x-10 ${
                            index == isActive ? "bg-mainLighter" : ""
                          }`
                        : ``
                    }`}
                    to={icon.href}
                  >
                    <img
                      src={icon.img}
                      className={`${
                        !isSidebarExpanded && index == isActive
                          ? "bg-mainLighter p-3 rounded-2xl"
                          : ""
                      }`}
                      alt={icon.name}
                    />
                    {isSidebarExpanded && (
                      <span className="w-[70%] text-left font-base text-highlightSecondary text-2xl uppercase">
                        {icon.name}
                      </span>
                    )}
                  </Link>
                  <TooltipContent className="capitalize text-highlightSecondary font-base p-2">
                    {!isSidebarExpanded && icon.name}
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            ))}
            <div className="border-2 border-highlightSecondary w-[80%]"></div>
            {extraSidebarIcons.map((icon, index) => (
              <Tooltip>
                <TooltipTrigger className={`${isSidebarExpanded && "w-full"}`}>
                  <Link
                    key={icon.name}
                    className={`${
                      isSidebarExpanded
                        ? `flex  w-full pl-[35px] justify-center items-center p-3 space-x-10 ${
                            index == isActive - sidebarIcons.length
                              ? "bg-mainLighter"
                              : ""
                          }`
                        : ``
                    }`}
                    to={icon.href}
                  >
                    <img
                      src={icon.img}
                      className={`${
                        index == isActive - sidebarIcons.length
                          ? "bg-mainLighter p-3 rounded-2xl"
                          : ""
                      }`}
                      alt={icon.name}
                    />
                    {isSidebarExpanded && (
                      <span className="w-[70%] text-left font-base text-highlightSecondary text-2xl uppercase">
                        {icon.name}
                      </span>
                    )}
                  </Link>
                  <TooltipContent className="capitalize text-highlightSecondary font-base p-2">
                    {!isSidebarExpanded && icon.name}
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <div
          className={
            isMobileNavExpanded
              ? "fixed left-0 top-0 w-[80%] border-r border-r-gray-900 h-full bg-main ease-in-out duration-500"
              : "ease-in-out fixed left-[-70%] w-[60%] duration-500"
          }
          style={{ height: isMobileNavExpanded ? "100%" : "0" }}
        >
          <div className="flex space-x-5 w-full p-4 items-center">
            {isMobileNavExpanded && (
              <>
                <img
                  onClick={toggleSidebar}
                  src="/assets/hamburger.svg"
                  alt="hamburger"
                  className="md:w-16 w-10"
                />
                <Link
                  to={"/subjects"}
                  className={`text-highlight font-display text-4xl`}
                >
                  KaizenKlass
                </Link>
              </>
            )}
          </div>
          <ul className="capitalize p-4 font-labnames text-offwhite">
            {sidebarIcons.map((icon) => (
              <Link
                className="flex py-3 items-center border-b border-highlightSecondary"
                to={icon.href}
              >
                <img src={icon.img} className="w-8" alt="" />
                <li className="p-4 text-highlightSecondary uppercase font-semibold font-base">
                  {icon.name}
                </li>
              </Link>
            ))}
            {extraSidebarIcons.map((icon) => (
              <Link
                className="flex py-3 items-center border-b border-highlightSecondary"
                to={icon.href}
              >
                <img src={icon.img} className="w-8" alt="" />
                <li className="p-4 text-highlightSecondary uppercase font-semibold font-base">
                  {icon.name}
                </li>
              </Link>
            ))}
            {!isAuthenticated ? (
              <>
                {navlinks.map((navLink) => (
                  <Link
                    className="border-b border-highlightSecondary"
                    to={navLink.href}
                  >
                    <li className="p-4 uppercase text-highlightSecondary font-base">
                      {navLink.name}
                    </li>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {authLinks.map((navLink) => (
                  <div className="border-highlightSecondary border-b">
                    <Link to={navLink.href}>
                      <li className="p-4 capitalize text-highlightSecondary font-base ">
                        {navLink.name}
                      </li>
                    </Link>
                  </div>
                ))}
                <div
                  onClick={logout}
                  className="p-4 border-b text-red-500 uppercase font-base border-highlightSecondary"
                >
                  Logout
                </div>
              </>
            )}
          </ul>
        </div>
        <div className="content overflow-auto w-full md:px-16 px-10 py-10 mb-16">
          {children}
        </div>
      </div>
    </div>
  );
};
