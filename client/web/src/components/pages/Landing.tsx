"use client";
import React, { useContext } from "react";
import { Navbar } from "../Navbar";
import { GlobalContext } from "../../app/context/GlobalContext";
import Image from "next/image";
import HeroSvg from "../../../public/assets/heroimg.svg";
import Link from "next/link";

const Landing = () => {
  const { updateCurrentPage } = useContext(GlobalContext);
  if (updateCurrentPage) {
    updateCurrentPage("home");
  }
  return (
    <div className="h-screen bg-primary">
      <Navbar />
      <div className="hero-section mt-[120px] flex items-center justify-between px-[140px]">
        <div className="hero-content">
          <h1 className="font-display font-bold flex flex-col text-white text-[80px] w-[250px] h-[350px]">
            Elevate Your Efficiency
          </h1>
          <p className="font-base text-[35px] font-light text-custom-blue w-[420px] my-5">
            combine your efforts and make work happend, beat class deadlines
            consistently
          </p>
          <div className="buttons justify-between items-center flex w-[380px]">
            <div className="flex hover:-translate-y-2 duration-150 transition-all justify-center items-center font-base font-bold border cursor-pointer border-custom-blue rounded-full w-[177px] h-[53px] text-[30px] text-custom-blue">
              <Link href={"/"} className="font-base font-light">
                Contribute
              </Link>
            </div>
            <div className="flex hover:-translate-y-2 border-custom-blue duration-150 transition-all font-bold justify-center py-2 items-center cursor-pointer font-base bg-custom-blue rounded-full w-[177px] h-[53px] text-[30px] text-white">
              <Link href={"/subjects"} className="font-base font-light">
                Classwork
              </Link>
            </div>
          </div>
        </div>
        <Image src={HeroSvg} alt="hero-svg" />
      </div>
    </div>
  );
};

export default Landing;
