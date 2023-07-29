"use client";

import Loading from "@/components/Loading";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillHome, AiFillFileAdd } from "react-icons/ai";
import { PiFilesDuotone } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/dashboard/Dashboard";

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [component, setComponent] = useState("Home");
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/user");
        setUser(response.data);
        setUserId(response.data.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <div className="flex flex-row font-bodyFont h-screen w-full">
          <div
            className={`${
              openSidebar ? "w-48" : "w-20"
            } bg-primaryColor h-screen top-0 bottom-0 left-0 flex flex-col fixed z-50`}
          >
            <div>
              <div
                className={`${
                  openSidebar ? "items-end mr-3" : "items-center"
                } cursor-pointer mb-4 text-3xl text-white flex flex-col mt-3`}
              >
                {openSidebar ? (
                  <IoMdClose
                    className="text-white"
                    onClick={() => setOpenSidebar(false)}
                  />
                ) : (
                  <GiHamburgerMenu onClick={() => setOpenSidebar(true)} />
                )}
              </div>
              <div
                className={`${
                  openSidebar ? "items-start ml-2" : "items-center"
                } text-white flex flex-col mt-5 text-3xl gap-4`}
              >
                <div
                  className="cursor-pointer hover:text-hoverColor flex flex-row gap-2"
                  onClick={() => setComponent("Home")}
                >
                  <AiFillHome />{" "}
                  {openSidebar && <span className="text-lg">Home</span>}
                </div>
                <div
                  className="cursor-pointer hover:text-hoverColor flex flex-row gap-2"
                  onClick={() => setComponent("Create")}
                >
                  <AiFillFileAdd />{" "}
                  {openSidebar && (
                    <span className="text-lg">Create Invoice</span>
                  )}
                </div>
                <div
                  className="cursor-pointer text-4xl hover:text-hoverColor flex flex-row gap-2"
                  onClick={() => setComponent("Customize")}
                >
                  <PiFilesDuotone />{" "}
                  {openSidebar && <span className="text-lg">Customize</span>}
                </div>
              </div>
              <div
                className={`${
                  openSidebar ? "items-start ml-3" : "items-center"
                } text-white flex flex-col bottom-7 absolute text-3xl w-full`}
              >
                <div className="cursor-pointer hover:text-hoverColor flex flex-row gap-2">
                  <FaUserCircle />{" "}
                  {openSidebar && <span className="text-lg"> My Profile</span>}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-screen absolute'>
          <div className={`${openSidebar ? "pl-48" : "pl-20"} w-full h-full flex flex-col gap-2`}>
            <div className='w-full h-20'>
              <Navbar btn="LOGOUT"/>
            </div>
            <div className='border-blue-800 mt-2 h-full w-full overflow-x-hidden'>
              {component == "Home" && <div className='h-full overflow-y-scroll scrollbar-none'> 
                <Dashboard/>
                </div>}
              {component == "Create" && (
                <div className='w-full'>
                  <InvoiceForm user={user} />
                </div>
              )}
              {component == "Customize" && <div> Customize Page </div>}
            </div>
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
