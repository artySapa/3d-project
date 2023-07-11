import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const picture = user.picture;
  const [imageDataUrl, setImageDataUrl] = useState("");

  console.log(user);


  const navigateTo = useNavigate();

  if(user.username === null){navigateTo("/login")}

  if (picture) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDataUrl(reader.result);
    };
    reader.readAsDataURL(new Blob([new Uint8Array(picture)]));
  }

  useEffect(() => {
    if(user.username === ""){navigateTo("/login");}
    if (picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(new Blob([new Uint8Array(picture)]));
    }
  }, [picture, user]);

  

  return (
    <div className="flex-column w-[50%]  p-20">
      <h2 className="text-5xl font-bold mt-20 uppercase">
        Hello,{" "}
        <span className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {user.username}
        </span>{" "}
        {"\u202F"}!
      </h2>
      {imageDataUrl && <img src={imageDataUrl} alt="Profile Picture" />}
    </div>
  );
};

export default Profile;
