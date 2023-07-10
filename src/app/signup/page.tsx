"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const Signup = () => {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [expand, setExpand] = useState(false);

  const router = useRouter();

  const [user, setUser] = useState({
    companyName: "",
    email: "",
    password: "",
    gstin: "",
    contact: 0,
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (
      user.companyName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 6
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleSignup = async () => {
    console.log(user);
    setExpand(true);
  };

  const handleProfile = async () => {
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response?.status === 400) toast.error("User already exists");
      else {
        toast.success("User created successfully");
        router.push("/login");
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
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow-shadow sm:rounded-lg sm:px-10">
            <form className="space-y-4">
              {expand ? (
                <div className="gap-2 flex flex-col">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="gstin"
                  >
                    GSTIN No.
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={user.gstin}
                      id="gstin"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, gstin: e.target.value })
                      }
                      required
                    />
                  </div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="contact"
                  >
                    Contact No.
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      value={user.contact}
                      id="contact"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, contact: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="address"
                  >
                    Address Line 1
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={user.address}
                      id="address"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                    />
                  </div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={user.city}
                      id="city"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, city: e.target.value })
                      }
                    />
                  </div>
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={user.state}
                      id="state"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, state: e.target.value })
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="gap-2 flex flex-col">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={user.companyName}
                      id="companyName"
                      className="form-input block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-fuchsia-900 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUser({ ...user, companyName: e.target.value })
                      }
                      required
                    />
                  </div>
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
                </div>
              )}
              <div className="pt-2">
                <Button
                  fullWidth
                  disabled={disabled}
                  type="submit"
                  onClick={expand ? handleProfile : handleSignup}
                >
                  {expand ? "Create Account" : "Next >"}
                </Button>
              </div>
            </form>
            {!expand && (
              <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                <div>Already have an account?</div>
                <div className="underline cursor-pointer hover:text-blue-600">
                  <Link href="/login"> Login </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
