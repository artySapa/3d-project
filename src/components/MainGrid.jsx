import React, { useState, useEffect } from "react";

import axios from "axios";
import PostCard from "./PostCard";

const MainGrid = () => {
  const URL = "http://localhost:8080";

  const [entries, setEntries] = useState([]);

  /* FOR ADDITIONS */
  const [entryContents, setEntryContents] = useState("");
  const [rank, setRank] = useState(0);
  const [description, setDescription] = useState("");
  /* ------------- */

  const addPost = () => {
    axios
      .post(`${URL}/entries/new`, {
        /* TODO: Add the user functionality here */ 
        title: entryContents,
        content: description,
        rank: rank,
        timestamp: Date.now(),
      })
      .then((response) => {
        setEntries((prevEntries) => {
          return [...prevEntries, response.data];
        });
      })
      .catch(console.error);

    setRank(0);
    setEntryContents("");
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

  console.log(entries);

  return (
    <div className="flex-column w-[50%] m-[auto]">
      <div className=" p-20 flex justify-between ">
        <input
          className="p-5"
          type="text"
          value={entryContents}
          onChange={(e) => {
            setEntryContents(e.target.value);
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
        {entries.map((entry, index) => {
          return (
            <div key={index}>
              <PostCard
                title={entry.title}
                content={entry.content}
                rank={entry.rank}
                time={entry.timestamp.toLocaleString()}
                user={entry.user}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainGrid;
