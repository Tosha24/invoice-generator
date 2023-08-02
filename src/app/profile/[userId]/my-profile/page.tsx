"use client";

import axios from "axios";
import Profile from "@/components/Profile/Profile";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const Showprofile = () => {
  const [user, setUser] = useState(null);

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
  }, []);

  return (
    <>
      {
        user ? <Profile user={user}/> : <div> <Loading/> </div>
      }
    </>
  );
};

export default Showprofile;
