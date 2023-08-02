import Navbar from "@/components/Navbar";
import axios from "axios";
import { useState } from "react";
import Loading from "../Loading";
import { toast } from "react-hot-toast";

interface Props {
  user: any;
}

const Profile = ({ user }: Props) => {
  const [edit, setEdit] = useState(false);

  const [localUser, setUser] = useState({
    companyName: user.data.companyName,
    email: user.data.email,
    gstin: user.data.gstin,
    contact: user.data.contact,
    address: user.data.address,
    city: user.data.city,
    state: user.data.state,
  });

  const saveChanges = () => {
    try {
      setEdit(false);
      console.log(localUser);
      const response = axios.post("/api/users/update-profile", localUser);
      toast.success("Profile Updated Successfully!");
    } catch (error: any) {
      console.log(error);
    }
  };

  const editChanges = (e: any) => {
    setUser({
        ...localUser,
        [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Navbar btn="Logout" />
      {user ? (
        <div className="flex justify-center items-center mt-3">
          <div className="bg-white px-4 py-6 shadow-shadow sm:rounded-lg sm:px-10 w-[50%] flex flex-col gap-3">
            <div className="w-full flex justify-center items-center text-primaryColor text-[30px] font-semibold mb-2">
              Profile
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">
                Company Name :{" "}
              </label>
              <input
                placeholder="Who is this invoice from?"
                className={`${edit ? "bg-white border border-black" : "bg-[#f6e2ff]"} w-full placeholder:text-gray-600 pl-3 p-[6px] rounded-lg`}
                value={localUser.companyName}
                onChange={(e) => editChanges(e)}
                type="text"
                name="companyName"
                autoComplete="off"
                disabled={!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">
                Email Address :{" "}
              </label>
              <input
                placeholder="Customer's Email"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={localUser.email}
                type="text"
                name="email"
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">Contact : </label>
              <input
                placeholder="Contact"
                className={`${edit ? "bg-white border border-black" : "bg-[#f6e2ff]"} w-full placeholder:text-gray-600 pl-3 p-[6px] rounded-lg`}
                value={localUser.contact}
                onChange={(e) => editChanges(e)}
                type="tel"
                autoComplete="off"
                name="contact"
                maxLength={10}
                disabled={!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">GSTIN : </label>
              <input
                placeholder="Customer's GSTIN"
                className="w-full placeholder:text-gray-600 pl-3 p-[6px] bg-[#f6e2ff] border border-borderColor rounded-lg"
                value={localUser.gstin}
                type="text"
                name="gstin"
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">Address : </label>
              <input
                placeholder="Customer's Address"
                className={`${edit ? "bg-white border border-black" : "bg-[#f6e2ff]"} w-full placeholder:text-gray-600 pl-3 p-[6px] rounded-lg`}
                value={localUser.address}
                type="text"
                name="address"
                autoComplete="off"
                onChange={(e) => editChanges(e)}
                disabled={!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">City : </label>
              <input
                placeholder="Customer's City"
                className={`${edit ? "bg-white border border-black" : "bg-[#f6e2ff]"} w-full placeholder:text-gray-600 pl-3 p-[6px] rounded-lg`}
                value={localUser.city}
                onChange={(e) => editChanges(e)}
                autoComplete="off"
                type="text"
                name="city"
                disabled={!edit}
              />
            </div>
            <div className="w-full flex flex-row">
              <label className="w-[32%] font-bold p-[6px]">State : </label>
              <input
                placeholder="Customer's State"
                className={`${edit ? "bg-white border border-black" : "bg-[#f6e2ff]"} w-full placeholder:text-gray-600 pl-3 p-[6px] rounded-lg`}
                value={localUser.state}
                onChange={(e) => editChanges(e)}
                autoComplete="off"
                type="text"
                name="state"
                disabled={!edit}
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-primaryColor text-xl text-white p-2 rounded-md"
                onClick={edit ? saveChanges : () => setEdit(true)}
              >
                {edit ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
