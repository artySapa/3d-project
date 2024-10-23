import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";

const MainGrid = () => {
 // const URL = "https://3d-project-backend.vercel.app";
  const URL = "http://localhost:8080";

  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true); // State to manage loading spinner

  const user = useSelector((state) => state.user);

  /* FOR ADDITIONS */
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState(0);
  const [description, setDescription] = useState("");

  const addPost = () => {
    if (!user.username) {
      alert("Please log in first!");
      return;
    }
    setLoading(true);
    axios
      .post(`${URL}/entries/new`, {
        title: title,
        content: description,
        rank: rank,
        timestamp: Date.now(),
        id: entries.length,
        user: user.username,
        picture: user.picture,
      })
      .then((response) => {
        setEntries((prevEntries) => [...prevEntries, response.data]);
        setIsModalOpen(false); // Close modal after submitting
      })
      .catch(console.error);

    setRank(0);
    setLoading(false);
    setTitle("");
    setDescription("");
  };

  const getFeed = () => {
    axios
      .get(URL + "/entries")
      .then(async (response) => {
        await setEntries(response.data.reverse());
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col m-auto items-center min-h-screen">
      <h2 className="text-4xl w-11/12 font-bold mt-20 text-center md:text-left">
        POSTS
      </h2>
      {/* Improved "Create a New Post" Button */}
      <div className="flex justify-center mb-12 w-full">
        <button
          className="bg-gradient-to-r from-blue-500 mt-4 to-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-lg font-semibold"
          onClick={() => {
            if (!user.username) {
              alert("Please log in first!");
              return;
            }
            setIsModalOpen(true);
          }}
        >
          Create a New Post
        </button>
      </div>

      {/* Modal for creating a post */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Create a Request</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give a name to your request"
              />
              <input
                className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe"
              />
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md text-lg font-semibold transition-all duration-200 ease-in-out"
                onClick={addPost}
              >
                ADD REQUEST TO THE COMMUNITY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center mt-12">
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
      ) : entries.length === 0 ? (
        // Display message when there are no posts
        <div className="flex justify-center items-center mt-12">
          <p className="text-gray-500 text-xl">No posts yet, be the first!</p>
        </div>
      ) : (
        // Post Grid
        <div className="grid gap-4 mt-5 mb-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4">
          {entries.map((entry, index) => {
            const timestamp = new Date(entry.timestamp);
            const formattedDate = timestamp.toLocaleDateString();
            const formattedTime =
              timestamp.toLocaleTimeString().slice(0, 4) +
              " " +
              timestamp.toLocaleTimeString().slice(8, 12);

            let passLike = entry.likedUsers.includes(user.username);

            return (
              <div key={index} className="mt-5">
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
      )}
    </div>
  );
};

export default MainGrid;
