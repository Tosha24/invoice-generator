"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { TiTick } from "react-icons/ti";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.status === 400) {
        toast.error(response.data.error);
      } else {
        router.push(`profile/${response.data.id}`);
        toast.success("Logged-in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-screen overflow-x-hidden p-16">
          <div className="h-full md:flex md:flex-row">
            <div className="hidden md:inline-flex w-full p-10">
              <div className="h-full w-full p-10 flex flex-col gap-10 bg-primaryColor rounded-lg">
                <span className="text-4xl font-semibold font-titleFont text-white text-center">
                  {" "}
                  We are more than just an Invoice&nbsp;Generator
                </span>
                <div className="items-center justify-center mx-auto">
                  <div className="font-bodyFont text-xl text-white flex flex-col gap-4">
                  <div className="flex flex-row">
                      <TiTick className='text-2xl'/>
                      Completely free
                    </div>
                    <div className="flex flex-row">
                      <TiTick className='text-2xl'/>
                      Secure and Reliable
                    </div>
                    <div className="flex flex-row">
                      <TiTick className='text-2xl' />
                      Easy to understand and use{" "}
                    </div>
                    <div className="flex flex-row">
                      <TiTick  className='text-2xl'/>
                      Flexible to customer data and solution{" "}
                    </div>
                    <div className="flex flex-row">
                      <TiTick className='text-2xl' />
                      Scalable from Accountant to Large Industries
                    </div>
                    <div className="flex flex-row">
                      <TiTick />
                      All in one solution for different business requirements
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:mx-auto flex flex-col w-full items-center justify-center gap-8">
              <span className='font-titleFont text-3xl tracking-widest text-primaryColor font-extrabold'> LOGIN </span>
              <div className="bg-white px-4 py-8 shadow-shadow sm:rounded-lg sm:px-10 w-2/3">
                <form className="space-y-4" onSubmit={handleLogin}>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      value={user.email}
                      id="email"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={user.password}
                      id="password"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      required
                    />
                    <div
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button fullWidth disabled={disabled} type="submit">
                      Log in
                    </Button>
                  </div>
                </form>
                <div className="flex flex-wrap gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                  <div>Don't&nbsp;have&nbsp;an&nbsp;account?</div>
                  <div className="underline cursor-pointer hover:text-blue-600">
                    <Link href="/signup"> Create an account </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
