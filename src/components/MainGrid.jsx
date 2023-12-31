import React, { useState, useEffect } from "react";

import axios from "axios";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";

const MainGrid = () => {
  const URL = "http://localhost:8080";

  const [entries, setEntries] = useState([]);

  const user = useSelector((state) => state.user);

  /* FOR ADDITIONS */
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState(0);   // fix this a lot, this is passing to all the entries at once
  const [description, setDescription] = useState("");
//   const [activeLike, setActiveLike] = useState(true); // fix this a lot, this is passing to all the entries at once
  /* ------------- */

  const addPost = () => {
    if(!user.username){
        alert("Please log in first!");
        return;
    }
    axios
      .post(`${URL}/entries/new`, {
        /* TODO: Add the user functionality here */ 
        title: title,
        content: description,
        rank: rank,
        timestamp: Date.now(),
        id: entries.length,
        user: user.username,
        picture: user.picture,
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
    console.log(entries);
  };

 
  const getFeed = () => {
    axios
      .get(URL + "/entries")
      .then(async (response) => {
         await setEntries(response.data.reverse());
      })
      .catch(console.error);
  };

  useEffect(() => {
    getFeed();
  }, [entries, rank]);
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex-column m-[auto] align-center">
        <h2 className="text-5xl w-[50%] m-[auto] font-bold mt-20">POSTS</h2>
      <div className=" p-20 w-[50%] m-[auto] flex justify-between ">
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
      <div className="inline-grid gap-4 ml-[5%] grid-cols-3 w-[90%]">
        {entries.map((entry, index) => {
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
  );
};

export default MainGrid;
