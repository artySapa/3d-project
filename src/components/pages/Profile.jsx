import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard";

const Profile = () => {
  const [entries, setEntries] = useState([]);
  const [requests, setRequests] = useState([]);

  const user = useSelector((state) => state.user);
  const picture = user.picture;

  const URL = "http://localhost:8080";

  const navigateTo = useNavigate();


  const getFeed = () => {
    axios
      .get(URL + "/entries")
      .then(async (response) => {
        await setEntries(response.data.reverse());
        const tempEn = entries.filter((item) => item.user === user.username);   
        setRequests(tempEn);
      })
      .catch(console.error);
  };


  useEffect(() => {
    if (user.username === "") {
      navigateTo("/login");
    }
  }, [user, navigateTo]);

  useEffect(() => {
    getFeed();
  }, []);
  useEffect(() => {
    getFeed();
  }, [requests, entries]);

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
      <div className="flex">
      {picture && (
        <img src={picture} alt="Profile Picture" className="w-[310px] h-[310px] rounded-full object-cover mr-2 shadow mt-[50px] ml-[50px]" />
      )}
      <div className="flex-column ml-[300px]">
      <h2 className="text-5xl font-bold mt-20 uppercase">YOUR REQUESTS:</h2>
      <div className="w-[130%]">
        {requests.map((entry, index) => {
          // Convert timestamp to localized date and time string
          const timestamp = new Date(entry.timestamp);
          const formattedDate = timestamp.toLocaleDateString();
          const formattedTime = timestamp.toLocaleTimeString().slice(0,4) + " " + timestamp.toLocaleTimeString().slice(8,12);

          let passLike = false;

          if(entry.likedUsers.includes(user.username)){
            passLike = true;
          }else{
            passLike = false;
          }

          return (
            <div key={index}>
              <PostCard
                key={entry._id}
                title={entry.title}
                content={entry.content}
                rank={entry.rank}
                time={`${formattedDate} ${formattedTime}`}
                id={entry._id}
                getFeed={getFeed}
                activeLike2={passLike}
                picture={entry.picture}
                userName={entry.user}
              />
            </div>
          );
        })}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
