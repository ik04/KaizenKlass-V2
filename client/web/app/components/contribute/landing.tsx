import { Link } from "@remix-run/react";
import React from "react";

export const Landing = () => {
  return (
    <div className="bg-[url('/assets/bg-contribute.webp')] bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center">
      <div className="hero flex flex-col items-center">
        <h1 className="title font-display text-5xl md:text-[140px] text-center text-highlight">
          Contribute
        </h1>
        <div className="description text-center md:text-3xl font-base text-highlightSecondary">
          Join the Community and make life easier for everyone involved
        </div>
        <div className="buttons mt-3 md:mt-6 flex space-x-3 md:space-x-5">
          <Link
            to={"https://chat.whatsapp.com/ITL9hNLjMU25kPJH9t3MUK"}
            target="_blank"
            className="cursor-default border border-highlight text-highlight md:w-[280px] text-base w-[120px] md:text-3xl h-[40px] md:h-[75px] justify-center items-center flex rounded-full font-base"
          >
            Whatsapp
          </Link>
          <Link
            to={"/register"}
            className="cursor-default border border-highlight bg-highlight text-primary md:w-[280px] text-base w-[120px] md:text-3xl h-[40px] md:h-[75px] justify-center items-center flex rounded-full font-base"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
