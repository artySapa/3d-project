import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const picture = user.picture;

  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.username === "") {
      navigateTo("/login");
    }
  }, [user, navigateTo]);

  if (user.username === null) {
    navigateTo("/login");
  }

  return (
    <div className="flex-column w-[50%] p-20">
      <h2 className="text-5xl font-bold mt-20 uppercase">
        Hello,{" "}
        <span className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {user.username}
        </span>{" "}
        {"\u202F"}!
      </h2>
      {picture && (
        <img src={picture} alt="Profile Picture" className="mt-4" />
      )}
    </div>
  );
};

export default Profile;
