"use client";

import Loading from "@/components/Loading";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AddInvoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

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
        <div className="mx-10 md:mx-24">
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
