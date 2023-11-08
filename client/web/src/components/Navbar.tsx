import axios from "axios";
import { GlobalContext } from "../app/context/GlobalContext";
import Link from "next/link";
import React, { useContext } from "react";
import toast from "react-hot-toast";

interface navbarProps {
  bordered?: boolean;
}

export const Navbar = (props: navbarProps) => {
  const { currentPage, isAuthenticated, name } = useContext(GlobalContext);

  const logout = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/logout`;
      const resp = await axios.post(url, {}, { withCredentials: true });
      console.log(resp);
      toast.success("Logged out!");
      location.href = "/assignments";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`flex justify-between items-center px-[140px] py-[10px]`}>
      <div className="font-display text-white text-[40px]">
        Kaizen<span className="text-custom-blue">Klass</span>
      </div>
      <div className="nav-links flex text-[25px] items-center text-white w-[400px] space-x-[25px] mt-2">
        <Link
          href={"/"}
          className={`font-base ${
            currentPage === "home" && "text-custom-blue"
          }`}
        >
          Home
        </Link>
        <Link
          href={"/subjects"}
          className={`font-base ${
            currentPage === "classwork" && "text-custom-blue"
          }`}
          // todo: link this to assignments first ?
        >
          Classwork
        </Link>
        {!isAuthenticated ? (
          <>
            <Link
              href={"/"}
              className={`font-base ${
                currentPage === "contribute" && "text-custom-blue"
              }`}
            >
              Contribute
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link
              href={"/profile"}
              className={`font-base ${
                currentPage === "contribute" && "text-custom-blue"
              }`}
            >
              {name}
            </Link>
          </>
        )}
        {isAuthenticated && (
          <div
            onClick={logout}
            className={`font-base text-custom-blue hover:text-red-500 duration-200 cursor-pointer`}
          >
            logout
          </div>
        )}
      </div>
    </div>
  );
};
