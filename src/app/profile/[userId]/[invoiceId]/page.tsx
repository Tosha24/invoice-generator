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
import { toast } from "react-hot-toast";

const InvoicePage = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [paid, setPaid] = useState(false);

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

    const fetchInvoice = () => {
      const invoiceRes = user?.data.invoices.filter((invoice: any) => {
        if(invoice._id === params.invoiceId) return invoice;
      });
      setInvoice(invoiceRes);
    };

    fetchUser();
    fetchInvoice();
  }, [user?.data.companyName]);

  const goBack = () => {
    router.back();
  };

  const markAsPaid = () => {
    setPaid(!paid);
  }

  const editInvoice = () => {
    setEdit(true);
  }

  const saveChanges = () => {
    setEdit(false);
  }

  const deleteInvoice = () => {
    toast.success("Invoice Deleted Successfully!");
  }

  return (
    <div>
      <Navbar btn="LOGOUT" />
      {user && invoice ? (
        <div className="m-2 mx-3">
          <div className="flex flex-row w-full gap-4">
            <div className="w-1/5">
              <div className="flex flex-col w-1/6 rounded-lg gap-8 fixed mt-4">
                <div
                  onClick={goBack}
                  className="cursor-pointer text-lg flex flex-row items-center gap-2"
                >
                  <IoIosArrowBack /> Go Back
                </div>
                <div className="text-[22px] items-center flex flex-row gap-x-3 w-full">
                  <span className="font-semibold">Status: </span>
                  <span className="bg-[#fa983a] text-white w-full p-2 rounded-md justify-center items-center flex shadow-sm text-lg">
                    {invoice[0]?.status}
                  </span>
                </div>
                <div className="flex flex-col gap-3 text-lg">
                  <button className="p-2 px-3 border rounded-md text-white bg-green-700 shadow-sm" onClick={markAsPaid}>
                    {paid ? "Mark as Unpaid" : "Mark as Paid"}
                  </button>
                  <button className="p-2 px-3 border rounded-md text-white bg-[#192a56] shadow-sm" onClick={edit ? saveChanges : editInvoice}>
                    {edit ? "Save Changes" : "Edit"}
                  </button>
                  <button className="p-2 px-3 border rounded-md text-white bg-red-700  shadow-sm" onClick={deleteInvoice}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div>
              <ShowInvoice user={user} invoice={invoice[0]}/>
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
