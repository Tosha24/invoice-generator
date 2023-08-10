"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidPencil } from "react-icons/bi";

const Showprofile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editCompanyName, setCompanyName] = useState(false);
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

  const handleChanges = () =>{
    try {
      setEdit(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar btn="LOGOUT"/>
      {user ? (
        <div className="flex justify-center items-center">
          <div className="bg-white px-4 py-6 shadow-shadow sm:rounded-lg sm:px-10 w-[50%] flex flex-col gap-3">
            <div className="w-full flex justify-center items-center text-primaryColor text-[30px] font-semibold mb-2">
              Profile
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">Company Name : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={editCompanyName ? "" : user.data.companyName}
                
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">Email Address : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={user.data.email}
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">Contact : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={user.data.contact}
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">GSTIN : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={user.data.gstin}
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">Address : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={user.data.address}
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">City : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={user.data.city}
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">State : </label>
              <input
                placeholder="Who is this invoice from?"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={user.data.state}
                type="text"
                name="billFrom"
                disabled = {!edit}
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button className="bg-primaryColor w-28 text-xl text-white py-0.5 rounded-md" onClick={handleChanges}>Edit</button>

            </div>
          </div>
        </div>
      ) : (
        <div> Please login first </div>
      )}
    </div>
  );
};

export default Showprofile;

