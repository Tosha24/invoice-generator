"use client";

import Loading from "@/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import Navbar from "@/components/Navbar";

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <Navbar btn="LOGOUT" />
      {user ? (
        <div className="font-bodyFont w-full">
          <div className="w-full">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="border-blue-800 mt-2 h-full w-full overflow-x-hidden">
                <div className="h-full overflow-y-scroll scrollbar-none">
                  <Dashboard />
                </div>
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
