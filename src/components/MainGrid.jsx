import React, { useState, useEffect } from "react";

import axios from "axios";

const MainGrid = () => {
  const URL = "http://localhost:8080";

  const [entries, setEntries] = useState([]);
  const [displayFeed, setDisplayFeed] = useState([]);

  /* FOR ADDITIONS */
  const [entryContents, setEntryContents] = useState("");
  const [rank, setRank] = useState(0);
  /* ------------- */

  const addPost = () => {
    axios
      .post(`${URL}/entries/new`, {
        content: entryContents,
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
  };

  const getFeed = () => {
    axios
      .get(URL + "/entries")
      .then((response) => {
        setEntries(response.data);
      })
      .catch(console.error);
  };

  const getItems = () => {
    if (entries.length === 0) {
      return;
    }

    const itemMap = {};
    for (let i = 0; i < entries.length; i++) {
      const label = entries[i].rank;
      const content = entries[i].content;
      if (!itemMap[label]) {
        itemMap[label] = { label, entries: [] };
      }
      itemMap[label].entries.push(content);
    }

    const tempCont = Object.values(itemMap);
    setDisplayFeed(tempCont);
  };

  useEffect(() => {
    getFeed();
    getItems();
  }, [entries]);

  console.log(entries);

  return (
    <div>
    <div className="p-20 flex justify-between">
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
        value={rank}
        onChange={(e) => {
          setRank(e.target.value);
        }}
        placeholder="Set the rank"
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
          <div>{entry.content}</div>
          <div>{entry.rank}</div>
          <div>{entry.timestamp}</div>
        </div>
      );
    })}
  </div>
  </div>
  );
};

export default MainGrid;
