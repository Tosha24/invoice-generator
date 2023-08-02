import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    user: any;
}

const Customize = ({user} : Props) => {
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
        try{
            console.log(localUser);
            setEdit(false);
            const response = axios.post("/api/users/update-profile", localUser);
        }catch(error: any) {
            console.log(error);
        }
    }

  return (
    <div>
        <input type="text"
        value={localUser.companyName}
        onChange={(e) => setUser({
            ...localUser,
            companyName: e.target.value,
        })}
        disabled={!edit}/>

        <button onClick={edit ? saveChanges : () => setEdit(true)}>
            {edit ? "Save Changes" : "Edit"}
        </button>
    </div>
  )
}

export default Customize