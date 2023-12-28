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
  // ? should i rename this to name or keep as username
  const AdminRole = 0;
  const ContributorRole = 1;

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
    } catch (error) {}
  };

  // just couldn't think of a better name at the time
  let isAdmin, hasEditPrivileges;

  useEffect(() => {
    callUserData();
    isAdmin = role == AdminRole ? true : false;
    hasEditPrivileges = role == AdminRole || role ? true : false;
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
