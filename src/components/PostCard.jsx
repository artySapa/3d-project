import axios from "axios";
import React, { useState, useEffect } from "react";

const PostCard = ({ title, content, user, time, rank, id, getFeed }) => {
  const URL = "http://localhost:8080";
  const [activeLike, setActiveLike] = useState(false);

  const changeLikes = (id, currRank) => {
    if (activeLike) {
      axios
        .put(`${URL}/entries/rank/${id}`, { rank: currRank - 1 })
        .then((response) => {
          setActiveLike(!activeLike);
        })
        .catch(console.error);
    } else {
      axios
        .put(`${URL}/entries/rank/${id}`, { rank: currRank + 1 })
        .then((response) => {
          setActiveLike(!activeLike);
        })
        .catch(console.error);
    }
  };

  const deletePost = (id) => {
    /* TODO: add authorization check */
    const confirmed = window.confirm("Are you sure you want to delete the post?")
    if(!confirmed){return;}
    axios
      .delete(`${URL}/entries/delete/${id}`)
      .then((response) => {
        console.log(`Post ${id} was deleted from the database`);
        console.log(response);
        getFeed(); // Call getFeed to update the list after successful deletion
      })
      .catch((error) => {
        console.error(error);
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
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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
