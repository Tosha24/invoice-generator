"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  const [user, setUser] = useState({
    companyName: "",
    email: "",
    password: "",
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
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("User created successfully");
      router.replace("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-4">
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
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                <Button
                  fullWidth
                  disabled={disabled}
                  type="submit"
                  onClick={handleSignup}
                  danger
                >
                  Create Account
                </Button>
              </div>
            </form>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>Already have an account?</div>
              <div className="underline cursor-pointer hover:text-blue-600">
                <Link href="/"> Login </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
