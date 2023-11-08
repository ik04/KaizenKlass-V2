import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import Book from "../../public/assets/auto_stories.svg";
import Test from "../../public/assets/contract.svg";
import Past from "../../public/assets/article.svg";
import Image from "next/image";
import { GlobalContext } from "../app/context/GlobalContext";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export interface LayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
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
    <div className="">
      <div className="fixed w-full z-20">
        <div
          className={`flex justify-between items-center px-[100px] py-[10px] bg-primary-complement`}
        >
          <Link
            href={"/"}
            className="cursor-pointer font-display text-white text-[40px] mr-3"
          >
            Kaizen<span className="text-custom-blue">Klass</span>
          </Link>
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
              href={"/assignments"}
              className={`font-base ${
                currentPage === "classwork" && "text-custom-blue"
              }`}
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
        </div>{" "}
      </div>
      <div className="flex">
        <div className="flex text-white w-[400px]">
          <div className="bg-primary-complement fixed h-full w-[18%] flex items-center justify-center space-y-[14rem] flex-col">
            <Link
              href={"/subjects"}
              className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition cursor-pointer"
            >
              <Image src={Book} alt="book" width={45} height={45} />

              <p className="text-2xl font-base">Subjects</p>
            </Link>
            <Link
              href={"/assignments"}
              className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition cursor-pointer"
            >
              <Image src={Past} alt="book" />
              <p className="text-2xl font-base">Assignments</p>
            </Link>
            <div className="flex items-center gap-5 hover:-translate-y-2 duration-300 ease-in-out transition cursor-pointer">
              <Image src={Test} alt="paper" />

              <p className="text-2xl font-base">Resources</p>
            </div>
          </div>
        </div>
        <div className="p-14 w-full z-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
