import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const Logout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handleLogout = async() => {
        try{
            setIsLoading(true);
            await axios.get('/api/users/logout');
            toast.success("Logout successfully");
            router.push('/login');

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
      className="block w-full bg-red-500 text-white tracking-wider py-2 rounded-lg"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Logout;
