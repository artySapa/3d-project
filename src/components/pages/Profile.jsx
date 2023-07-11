import React from "react";

import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);

    console.log(user);
    return(
        <div className="flex-column w-[50%]  p-20">
            <h2 className="text-5xl font-bold mt-20 uppercase">Hello, <span className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{user.username}</span>{'\u202F'}!</h2>
            <img src={user.picture} alt=""></img>
        </div>
    )
}

export default Profile;