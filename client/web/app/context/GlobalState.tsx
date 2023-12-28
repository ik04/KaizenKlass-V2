import React, { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";

export const GlobalState = ({
  children,
  baseUrl,
}: {
  children: ReactNode;
  baseUrl?: string;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [userUuid, setUserUuid] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasEditPrivileges, setHasEditPrivileges] = useState(false);
  // ? should i rename this to name or keep as username
  const AdminRole = 0;
  const CrossCheckerRole = 1;

  const callUserData = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/user-data`);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${resp.data.access_token}`;
      // console.log(resp.data);
      setIsAuthenticated(true);
      setUsername(resp.data.name);
      setEmail(resp.data.email);
      setRole(resp.data.role);
      setUserUuid(resp.data.uuid);
      setIsAdmin(resp.data.role === AdminRole);
      setHasEditPrivileges(
        resp.data.role === AdminRole || resp.data.role === CrossCheckerRole
      );
    } catch (error) {}
  };

  // just couldn't think of a better name at the time

  useEffect(() => {
    callUserData();
  }, []);
  //! fix the context for root
  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        role,
        username,
        userUuid,
        email,
        isSidebarExpanded,
        setSidebarExpanded,
        isAdmin,
        hasEditPrivileges,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export async function loader() {
  return process.env.PUBLIC_DOMAIN;
}
