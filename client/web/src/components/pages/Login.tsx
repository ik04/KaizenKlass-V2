"use client";
import React, { useState } from "react";
import { Navbar } from "../Navbar";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/login`;
      if (password !== "" && email !== "") {
        const resp = await axios.post(
          url,
          { email: email, password: password },
          { withCredentials: true }
        );
        console.log(resp);
        toast.success("Logged In Successfully");
        location.href = "/assignments";
      } else {
        toast.error("Please fill in all details");
      }
      // ! issue: find the correct type
    } catch (error: any) {
      console.log(error.response.data);

      if (Array.isArray(error.response.data)) {
        error.response.data.forEach((errorMsg: any) => {
          toast.error(errorMsg);
        });
      } else if (
        error.response.data &&
        Array.isArray(error.response.data.error)
      ) {
        error.response.data.error.forEach((errorMsg: any) => {
          toast.error(errorMsg);
        });
      } else if (
        error.response.data &&
        typeof error.response.data.error === "string"
      ) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="bg-primary h-screen ">
      <Navbar />
      <div className="flex flex-col items-center h-[90%] justify-center">
        <div className="login-section bg-primary-complement flex flex-col justify-evenly items-center w-[500px] h-[500px]">
          <h1 className="Logo text-center font-display text-white text-[70px]">
            Kaizen<span className="text-custom-blue">Klass</span>
          </h1>
          <div className="flex flex-col w-[70%]">
            <label htmlFor="email" className="font-base text-white text-[30px]">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-complement text-[25px] font-light p-3 font-base text-white border-custom-blue border-[1px] h-[50px] rounded-md"
            />
          </div>
          <div className="flex flex-col w-[70%]">
            <label htmlFor="email" className="font-base text-white text-[30px]">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              required
              className="bg-primary-complement text-[25px] font-light p-3 font-base text-white border-custom-blue border-[1px] h-[50px] rounded-md"
            />
          </div>
          <div
            onClick={login}
            className="login-button cursor-pointer hover:bg-primary-complement hover:text-custom-blue border-custom-blue border-[1px] duration-150 w-[40%] rounded-full h-[50px] flex justify-center text-[30px] items-center font-base bg-custom-blue text-white text-center"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
