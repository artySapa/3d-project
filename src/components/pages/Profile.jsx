import React from "react";

const Profile = ({user, setUser}) => {
    return(
        <div className="flex-column w-[50%]  p-20">
            <h2 className="text-5xl font-bold mt-20 uppercase">Hello, <span className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{user}</span>{'\u202F'}!</h2>
        </div>
    )
}

export default Profile;