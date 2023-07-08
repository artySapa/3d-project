import React, { useState, useEffect } from "react";

import axios from "axios";
import PostCard from "./PostCard";

const MainGrid = ({user, setUser}) => {
  const URL = "http://localhost:8080";

  const [entries, setEntries] = useState([]);

  /* FOR ADDITIONS */
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState(0);
  const [description, setDescription] = useState("");
  /* ------------- */

  const addPost = () => {
    axios
      .post(`${URL}/entries/new`, {
        /* TODO: Add the user functionality here */ 
        title: title,
        content: description,
        rank: rank,
        timestamp: Date.now(),
        id: entries.length,
        user: user,
      })
      .then((response) => {
        setEntries((prevEntries) => {
          return [...prevEntries, response.data];
        });
      })
      .catch(console.error);

    setRank(0);
    setTitle("");
    setDescription("");
  };

 
  const getFeed = () => {
    axios
      .get(URL + "/entries")
      .then((response) => {
        setEntries(response.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getFeed();
  }, [entries]);

  return (
    <div className="flex-column w-[50%] m-[auto]">
        <h2 className="text-5xl font-bold mt-20">POSTS</h2>
      <div className=" p-20 flex justify-between ">
        <input
          className="p-5"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Give a name"
        />
        <input
          className="p-5"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Describe"
        />
        <button
          className="bg-[pink] p-2 text-black"
          onClick={() => {
            addPost();
          }}
        >
          ADD REQUEST TO THE COMMUNITY
        </button>
      </div>
      <div>
        {entries.reverse().map((entry, index) => {
          // Convert timestamp to localized date and time string
          const timestamp = new Date(entry.timestamp);
          const formattedDate = timestamp.toLocaleDateString();
          const formattedTime = timestamp.toLocaleTimeString().slice(0,5) + " " + timestamp.toLocaleTimeString().slice(9,12);



          return (
            <div key={index}>
              <PostCard
                key={entry._id}
                title={entry.title}
                content={entry.content}
                rank={entry.rank}
                time={`${formattedDate} ${formattedTime}`}
                user={entry.user}
                id={entry._id}
                getFeed={getFeed}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainGrid;
