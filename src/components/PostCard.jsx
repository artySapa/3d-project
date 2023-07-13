import axios from "axios";
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

const PostCard = ({ title, content, time, rank, id, getFeed, activeLike2 }) => {
    const [activeLike, setActiveLike] = useState(activeLike2);
  const URL = "http://localhost:8080";

  const userObject = useSelector((state) => state.user);

  const user = userObject.username;
  const userImage = userObject.picture; // save this to a database to retrieve later and thats it

  const changeLikes = (id, currRank) => {
    if (!user) {
      alert("You are not logged in!");
      return;
    }

    // Toggle the activeLike state
    setActiveLike((prevActiveLike) => !prevActiveLike);

    if (activeLike) {
      axios
        .put(`${URL}/entries/rank/${id}`, {
          rank: currRank - 1,
          user: user,
          active: false,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(console.error);
    } else {
      axios
        .put(`${URL}/entries/rank/${id}`, {
          rank: currRank + 1,
          user: user,
          active: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(console.error);
    }
  };

  const deletePost = (id) => {
    /* TODO: add authorization check */
    const confirmed = window.confirm(
      "Are you sure you want to delete the post?"
    );
    if (!confirmed) {
      return;
    }
    axios
      .delete(`${URL}/entries/delete/${id}`, {user})
      .then((response) => {
        console.log(`Post ${id} was deleted from the database`);
        console.log(response);
        getFeed(); // Call getFeed to update the list after successful deletion
      })
      .catch((error) => {
        console.error(error);
        alert("This post does not belong to you!");
      });
  };

  useEffect(() => {
    getFeed();
  }, [activeLike]);


  return (
    <div className="flex bg-white shadow-lg rounded-lg md:mx-auto my-12 max-w-md justify-center md:max-w-xl">
      <div className="flex items-start px-4 py-6 ">
        <img
          className="w-[110px] h-[110px] rounded-full object-cover mr-4 shadow"
          src={userImage}
          alt="avatar"
        />
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {title}
            </h2>
            <button
              onClick={() => {
                deletePost(id);
              }}
            >
              <svg
                className="h-7 w-7 text-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="18" y1="6" x2="6" y2="18" />{" "}
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-gray-700">{time} </p>
          <p className="mt-3 text-gray-700 text-sm max-w-xs max-h-[100%] truncate whitespace-normal">
            {content}
          </p>
          <div className="mt-4 flex justify-between hover:text-[#FF5733]">
            <button
              className="flex mr-2 text-gray-700 text-sm mr-3 hover:text-[#FF5733]"
              onClick={() => {
                changeLikes(id, rank);
              }}
            >
              {!activeLike ? (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="text-red-400 h-auto fill-current w-4 h-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                </svg>
              )}
              <span>{rank}</span>
            </button>
            <div className="flex mr-2 text-gray-700 text-sm ml-52 hover:text-[#FF5733]">
              <svg
                className="h-8 w-8 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="grey"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <button className="hover:text-[#FF5733]">Respond</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
