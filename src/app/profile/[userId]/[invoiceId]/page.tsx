"use client";

import ShowInvoice from "@/components/invoice/ShowInvoice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { IoIosArrowBack } from "react-icons/io";
import InvoiceForm from "@/components/invoice/InvoiceForm";

const InvoicePage = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/user");
        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user]);

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <Navbar btn="LOGOUT" />
      {user ? (
        <div className="m-2 mx-3 flex flex-col">
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-1">
              <div className="flex flex-col px-auto w-1/6 rounded-lg gap-8 fixed mt-4">
                <div
                  onClick={goBack}
                  className="cursor-pointer text-lg flex flex-row items-center gap-2"
                >
                  <IoIosArrowBack /> Go Back
                </div>
                <div className="text-[22px] items-center flex flex-row gap-x-3 w-full">
                  <span className="font-semibold">Status: </span>
                  <span className="bg-[#fa983a] text-white w-full p-2 rounded-md justify-center items-center flex shadow-sm text-lg">
                    Pending
                  </span>
                </div>
                <div className="flex flex-col gap-3 text-lg">
                  <button className="p-2 px-3 border rounded-md text-white bg-green-700 shadow-sm">
                    Mark as Paid/Unpaid
                  </button>
                  <button className="p-2 px-3 border rounded-md text-white bg-[#192a56] shadow-sm">
                    Edit
                  </button>
                  <button className="p-2 px-3 border rounded-md text-white bg-red-700  shadow-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <InvoiceForm user={user} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default InvoicePage;
