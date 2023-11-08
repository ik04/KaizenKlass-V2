"use client";
import { createContext } from "react";
import { GlobalContextValue } from "./context";

export const GlobalContext = createContext<Partial<GlobalContextValue>>({});
