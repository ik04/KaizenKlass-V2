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
  const [role, setRole] = useState("");
  const [uuid, setUuid] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const callUserData = async () => {
    const resp = await axios.get(`${baseUrl}/api/v1/user-data`);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resp.data.access_token}`;
    setIsAuthenticated(true);
    setUsername(resp.data.username);
    setEmail(resp.data.email);
    setRole(resp.data.role);
    setUuid(resp.data.uuid);
  };

  useEffect(() => {
    callUserData();
  }, []);
  //! fix the context for root
  return (
    <GlobalContext.Provider
      value={{ isAuthenticated, role, username, uuid, email }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export async function loader() {
  return process.env.PUBLIC_DOMAIN;
}
