import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../PostCard";

const Profile = () => {
  const [entries, setEntries] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  const user = useSelector((state) => state.user);
  const picture = user.picture;

  const URL = "https://3d-project-backend.vercel.app";
  const navigateTo = useNavigate();

  const getFeed = () => {
    // setLoading(true); // Start loading
    axios
      .get(URL + "/entries")
      .then(async (response) => {
        await setEntries(response.data.reverse());
        const tempEn = response.data.filter((item) => item.user === user.username);
        setRequests(tempEn);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false); // Stop loading once the data is fetched
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
    <div className="flex-column p-20">
      <h2 className="text-5xl font-bold mt-20 uppercase">
        Hello,{" "}
        <span className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {user.username}
        </span>{" "}
        {"\u202F"}!
      </h2>
      <div className="flex">
        {picture && (
          <img
            src={picture}
            alt="Profile Picture"
            className="w-[310px] h-[310px] rounded-full object-cover mr-2 shadow mt-[50px] ml-[50px]"
          />
        )}
        <div className="flex-column ml-[300px]">
          {loading ? (
            <div className="flex justify-center items-center">
              {/* Loading spinner */}
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
              <h2 className="text-5xl font-bold mt-20 uppercase mb-8">Your Requests:</h2>
              <div className="w-[130%]">
                {requests.map((entry, index) => {
                  const timestamp = new Date(entry.timestamp);
                  const formattedDate = timestamp.toLocaleDateString();
                  const formattedTime =
                    timestamp.toLocaleTimeString().slice(0, 4) +
                    " " +
                    timestamp.toLocaleTimeString().slice(8, 12);

                  let passLike = entry.likedUsers.includes(user.username);

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
            </>
          ) : (
            <h2 className="text-5xl font-bold mt-20 uppercase">
              You have no requests yet.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
