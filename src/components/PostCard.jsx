import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ResponseDialog from "./pages/ResponseDialog";

const PostCard = ({
  title,
  content,
  time,
  rank,
  id,
  getFeed,
  activeLike2,
  picture,
  userName,
}) => {
  const [activeLike, setActiveLike] = useState(activeLike2);
  const [dialog, setDialog] = useState(false);
  const [tempRank, setTempRank] = useState(rank);

   const URL = "https://3d-project-backend.vercel.app";
  // const URL = "http://localhost:8080";

  const userObject = useSelector((state) => state.user);
  const user = userObject.username;

  const changeLikes = (id, currRank) => {
    setDialog(false);
    if (!user) {
      alert("You are not logged in!");
      return;
    }

    setActiveLike((prevActiveLike) => !prevActiveLike);

    if (activeLike) {
      setTempRank(tempRank - 1);
      axios
        .put(`${URL}/entries/rank/${id}`, {
          rank: currRank - 1,
          user: user,
          active: false,
        })
        .then((response) => console.log(response))
        .catch(console.error);
    } else {
      setTempRank(tempRank + 1);
      axios
        .put(`${URL}/entries/rank/${id}`, {
          rank: currRank + 1,
          user: user,
          active: true,
        })
        .then((response) => console.log(response))
        .catch(console.error);
    }
  };

  const deletePost = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the post?"
    );
    if (!confirmed) return;

    axios
      .delete(`${URL}/entries/delete/${id}`, {
        data: { username: userObject.username },
      })
      .then((response) => {
        console.log(`Post ${id} was deleted from the database`);
        getFeed();
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
    <div className="flex bg-gray-50 shadow-md hover:shadow-lg rounded-2xl md:max-w-xl mx-auto w-full overflow-hidden border border-gray-200">
      <div onClick={() => setDialog(true)} className="flex cursor-pointer items-start px-6 py-6 w-full">
        <img
          className="w-[80px] h-[80px] rounded-full object-cover mr-6 shadow-md"
          src={picture}
          alt="avatar"
        />
        <div className="flex-1 w-full">
          <div
            className="flex items-center justify-between"
          >
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {user === userName && (
              <button
                onClick={(event) => {
                  event.stopPropagation(); // Prevent dialog from opening
                  deletePost(id);
                }}
                className="text-gray-400 hover:text-red-600"
              >
                <svg
                  className="h-6 w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          <p  className="text-gray-500 text-xs">
            {time}
          </p>
          <p
            className="mt-2 text-gray-700 text-sm overflow-hidden text-ellipsis max-h-16 line-clamp-1"
          >
            {content}
          </p>

          <div className="mt-4 flex justify-between items-center w-full">
            <button
              className="flex items-center text-sm text-gray-700 hover:text-red-400"
              onClick={(event) => {
                event.stopPropagation(); // Prevent dialog from opening
                changeLikes(id, rank);
              }}
            >
              {activeLike ? (
                <svg
                  className="w-5 h-5 text-red-500 fill-current"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              <span className="ml-1">{tempRank}</span>
            </button>

            <div
              onClick={() => setDialog(true)}
              className="flex items-center text-gray-700 text-sm hover:text-red-400"
            >
              <svg
                className="h-5 w-5 text-gray-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <button>Chat</button>
            </div>
          </div>
        </div>
      </div>
      {dialog && (
        <ResponseDialog
          setDialog={setDialog}
          title={title}
          content={content}
          postId={id}
          userName={userName}
        />
      )}
    </div>
  );
};

export default PostCard;
