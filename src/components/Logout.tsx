import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import {BiLogOut} from 'react-icons/bi'
const Logout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handleLogout = async() => {
        try{
            setIsLoading(true);
            await axios.get('/api/users/logout');
            toast.success("Logged-out successfully!");
            router.push('/');

        }catch(error: any){
            console.log(error.message);
            toast.error(error.message);
        }
        finally{
            setIsLoading(false);
        }
    }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md text-white text-lg bg-red-700 font-bold duration-300 font-bodyFont tracking-wider hover:bg-red-800"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Logout;
