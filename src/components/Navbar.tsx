import logo from "/public/assets/images/full_logo.png";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-blue-100 sticky h-20 lg:h-[12vh] top-0 z-50 px-4">
      <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
        <div className="inline-flex items-center justify-center gap-4">
          <Image src={logo} alt="logo" className='w-28 mx-3'/>
        </div>
        <div className="inline-flex items-center absolute right-9">
          <Link href='/login'
          >
            <button className="px-4 py-2 rounded-md text-primary text-[15px] border border-primary font-bold hover:bg-fuchsia-600 duration-300">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
