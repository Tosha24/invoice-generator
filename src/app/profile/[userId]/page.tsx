"use client";

import Loading from "@/components/Loading";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/user");
        console.log(response.data);
        setUser(response.data);
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
            <Loading message="Please wait till you are authenticated"/>
        </div>
      )}
    </div>
  );
}
