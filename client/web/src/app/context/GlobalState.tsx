"use client";
import React, { useState, useEffect } from "react";
import { GlobalContextValue, GlobalStateProps } from "./context";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const updateCurrentPage = (value: string) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const callUserData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/user-data`;
        const resp = await axios.get(url, { withCredentials: true });
        console.log(resp);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resp.data.access_token}`;
        setUserUuid(resp.data.uuid);
        setEmail(resp.data.email);
        setName(resp.data.name);
        setRole(resp.data.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    };
    callUserData();
  }, []);
  const globalStateValue = {
    currentPage: currentPage,
    updateCurrentPage,
    userUuid: userUuid,
    email: email,
    name: name,
    role: role,
    isAuthenticated: isAuthenticated,
  };
  return (
    <GlobalContext.Provider value={globalStateValue}>
      {children}
    </GlobalContext.Provider>
  );
};
