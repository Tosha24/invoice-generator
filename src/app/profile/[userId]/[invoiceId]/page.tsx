"use client";

import InvoiceForm from "@/components/invoice/InvoiceForm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

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
      <div className="m-10 flex flex-col">
        <div>
          <span onClick={goBack} className="cursor-pointer">
            Go Back
          </span>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-row justify-between border-2 border-gray-400 p-4 rounded-lg">
            <div className="text-xl items-center flex gap-x-3">
              <span className="font-semibold">Status: </span>
              <span className="bg-orange-200 px-2 text-orange-700">
                pending
              </span>
            </div>
            <div className="flex flex-row gap-10">
              <button className="p-2 px-5 border rounded-md bg-green-500">
                Edit
              </button>
              <button className="p-2 px-5 border rounded-md bg-red-500">
                Delete
              </button>
              <button className="p-2 px-5 border rounded-md bg-sky-500">
                Mark as Paid/Unpaid
              </button>
            </div>
          </div>
          <div>{user ? <InvoiceForm user={user} /> : <div> Nothing </div>}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
