"use client";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function AddInvoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const router = useRouter();

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

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <Navbar btn="LOGOUT" />
      {user ? (
        <div className="mx-4">
          {/* <div
            onClick={goBack}
            className="cursor-pointer text-lg flex flex-row items-center gap-2"
          >
            <IoIosArrowBack/> Go Back
          </div> */}
          <InvoiceForm user={user} />
        </div>
      ) : (
        <div>
          <Loading message="Please wait till you are authenticated" />
        </div>
      )}
    </div>
  );
}
