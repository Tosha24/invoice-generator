"use client";

import Loading from "@/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import Navbar from "@/components/Navbar";
import Link, { useRouter } from "next/navigation";
import { FiPlusSquare } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/user");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const addInvoice = () => {
    Loading;
    router.push(`/profile/${params.userId}/add-invoice`);
  }

  return (
    <div>
      <Navbar btn="LOGOUT" />
      {user ? (
        <div className="font-bodyFont w-full">
          <div className="w-full">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="border-blue-800 mt-2 h-full w-full overflow-x-hidden">
                <div className="h-full overflow-y-scroll scrollbar-none">
                  <Dashboard user={user} />
                </div>
              </div>
            </div>
          </div>
          <div className="border w-12 h-12 text-4xl fixed font-extrabold tracking-wider cursor-pointer rounded-md font-bodyFont duration-300 items-center flex justify-center right-14 bottom-14 bg-hoverColor hover:rounded-2xl">
            <div onClick={addInvoice} className='text-white font-bold'>
              {/* <TiPlus/> */}
              {/* <FiPlusSquare /> */}
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loading message="Please wait till you are authenticated" />
        </div>
      )}
    </div>
  );
}
