"use client";

import logo from "/public/assets/images/full_logo.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { useParams, useRouter, usePathname } from "next/navigation";

interface Props {
  btn: string;
}

const Navbar = ({ btn }: Props) => {
  const [component, setComponent] = useState("Home");
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
    if(pathname === `/profile/${params.userId}`){
      setComponent('Home');
    }
    else if(pathname === `/profile/${params.userId}/my-profile`){
      setComponent("Profile");
    }
  }, []);

  return (
    <div className="w-full bg-white sticky h-20 lg:h-[12vh] top-0 z-50 px-4">
      <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
        <div className="inline-flex items-center justify-center gap-4">
          <Image src={logo} alt="logo" className="w-48 mx-2 md:mx-8" />
        </div>
        <div className="inline-flex items-center absolute right-4 md:right-9">
          {btn === "LOGIN" ? (
            <Link href="/login">
              <button className="px-4 py-2 rounded-md text-primaryColor text-[15px] border border-primaryColor font-bold hover:bg-primaryColor hover:text-white duration-300">
                LOGIN
              </button>
            </Link>
          ) : (
            <div className="flex flex-row gap-4 mr-8">
                <Link href={{ pathname: `/profile/${params.userId}`}} className='no-underline'>
                <div className={`${component === "Home" ? "underline underline-offset-2" : "no-underline"} px-4 py-2 rounded-md text-primaryColor text-xl bg-white font-bold duration-300 font-bodyFont tracking-wider`} onClick={() => setComponent("Home")}>
                  Home
                </div>
                </Link>

                <Link href={`/profile/${params.userId}/my-profile`} className='no-underline'>
                <div className={` ${component === "Profile" ? "underline underline-offset-2" : "no-underline"} px-4 py-2 rounded-md text-primaryColor text-xl bg-white font-bold duration-300 font-bodyFont tracking-wider`} onClick={() => setComponent("Profile")}>
                  Profile
                </div>
                </Link>
              <Logout />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;