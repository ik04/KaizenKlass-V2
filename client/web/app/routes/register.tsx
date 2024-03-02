import { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";
import React, { FormEvent } from "react";
import { BackButton } from "~/components/backButton";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";

interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Register | KaizenKlass" },
    { property: "og:title", content: "Register | KaizenKlass" },
    {
      property: "og:site_name",
      content: "Kaizen Klass",
    },
    // <meta property="og:site_name" content="Site Name" />
  ];
};

export default function register() {
  const { baseUrl }: { baseUrl: string } = useLoaderData();
  const register = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const target = event.target as typeof event.target & {
        name: { value: string };
        email: { value: string };
        password: { value: string };
      };

      const name = target.name.value;
      const email = target.email.value;
      const password = target.password.value;

      console.log({ name, email, password });
      const resp = await axios.post(`${baseUrl}/api/v1/register-contributor`, {
        name,
        email,
        password,
      });
      toast({
        title: "Registered successfully!",
        description: "Your Account has been created!",
        variant: "default",
      });
      location.href = "/login";
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        toast({
          title: "Invalid Credentials",
          description: `${error.response.data.message}`,
          variant: "destructive",
        });
      } else if (error.response && error.response.status === 422) {
        if (!error.response.data.errors.email) {
          toast({
            title: "Invalid Fields Inputs",
            description: `${error.response.data.errors.password}`,
            variant: "destructive",
          });
        } else if (!error.response.data.errors.password) {
          toast({
            title: "Invalid Fields Inputs",
            description: `${error.response.data.errors.email}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Invalid Fields Inputs",
            description: `${error.response.data.errors.email} and ${error.response.data.errors.password}`,
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div>
      {" "}
      <div className="">
        <div className="w-full p-3 flex bg-main justify-start items-center">
          <BackButton />
        </div>
        <form
          onSubmit={register}
          className="bg-main h-[93.6vh] flex flex-col justify-center items-center"
        >
          <div className="">
            <h1 className="text-highlight text-4xl font-display">
              KaizenKlass
            </h1>
            <Label>Name</Label>
            <Input placeholder="John Doe" name="name" />
            <Label>Email</Label>
            <Input placeholder="example@domain.com" name="email" />
            <Label>Password</Label>
            <Input placeholder="........." type="password" name="password" />
            <button
              type="submit"
              className="font-base w-full text-highlightSecondary border border-highlightSecondary cursor-pointer hover:bg-highlightSecondary hover:text-main duration-150 transition-all p-2 my-5 flex justify-center items-center text-xl"
            >
              Register
            </button>
          </div>
          <p className="text-highlightSecondary font-base">
            have an account?{" "}
            <Link
              className="text-highlight hover:text-gray-400 duration-200"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export const loader = async () => {
  const baseUrl: string = process.env.PUBLIC_DOMAIN || "";
  return { baseUrl };
};
