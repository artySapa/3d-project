import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard";

const Profile = () => {
  const [entries, setEntries] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const picture = user.picture;

  const URL = "https://3d-project-backend.vercel.app";
  const navigateTo = useNavigate();

  const getFeed = () => {
    axios
      .get(URL + "/entries")
      .then(async (response) => {
        await setEntries(response.data.reverse());
        const tempEn = response.data.filter((item) => item.user === user.username);
        setRequests(tempEn);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user.username === "") {
      navigateTo("/login");
    }
  }, [user, navigateTo]);

  useEffect(() => {
    getFeed();
  }, []);

  if (user.username === null) {
    navigateTo("/login");
  }

  return (
    <div className="min-h-screen pt-[calc(64px+2rem)] md:pt-[calc(64px+4rem)] flex flex-col items-center px-4">
      {/* Profile Section */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
        {picture && (
          <img
            src={picture}
            alt="Profile Picture"
            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full object-cover border-4 border-gray-300 shadow-md"
          />
        )}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{user.username}</span>!
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">Welcome back!</p>
        </div>
      </div>

      {/* Requests Section */}
      <div className="w-full max-w-4xl mt-10">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <svg
              className="animate-spin h-8 w-8 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        ) : requests.length > 0 ? (
          <>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Your Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((entry, index) => {
                const timestamp = new Date(entry.timestamp);
                const formattedDate = timestamp.toLocaleDateString();
                const formattedTime =
                  timestamp.toLocaleTimeString().slice(0, 4) +
                  " " +
                  timestamp.toLocaleTimeString().slice(8, 12);

                let passLike = entry.likedUsers.includes(user.username);

                return (
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
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-bold text-center mt-10">
              You have no requests yet.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
